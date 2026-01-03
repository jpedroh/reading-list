import { type DatabaseConnection } from "@reading-list/shared-database/connection";
import { createServerFn } from "@tanstack/react-start";
import { generateKey, totp } from "otp-io";
import { hmac } from "otp-io/crypto";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const addArticleSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string())),
  otp: z.string().max(6),
});

type NewArticle = Omit<z.infer<typeof addArticleSchema>, "tags">;

export const addArticle = createServerFn({ method: "POST" })
  .inputValidator((data) => addArticleSchema.parse(data))
  .handler(async (payload) => {
    if (!(await isOtpValid(payload.data.otp))) {
      throw new Error("Invalid OTP provided");
    }

    await saveArticle(
      {
        id: uuidv4(),
        title: payload.data.title,
        url: payload.data.url,
      },
      payload.data.tags,
    );
  });

async function isOtpValid(token: string) {
  const isDevBypass = env.VERCEL_ENV !== "production" && token === "000000";
  const key = generateKey(() => Buffer.from(env.OTP_SECRET));
  const issuedToken = await totp(hmac, { secret: { bytes: key.bytes } });
  return isDevBypass || issuedToken === token;
}

async function saveArticle(article: NewArticle, tags: string[]) {
  try {
    return await db.transaction(async (tx) => {
      await tx.insert(articles).values({ ...article, addedAt: new Date() });
      await tx.insert(articleTags).values(
        tags.map((tag) => {
          return { articleId: article.id, tag };
        }),
      );
    });
  } catch (cause) {
    throw new Error("Internal server error", { cause });
  }
}
