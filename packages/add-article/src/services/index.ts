import { type DatabaseConnection } from "@reading-list/shared-database/connection";
import { articles, articleTags } from "@reading-list/shared-database/schema";
import { generateKey, totp } from "otp-io";
import { hmac } from "otp-io/crypto";
import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

export const addArticleSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string())),
  otp: z.string().max(6),
});

export type AddArticleInput = z.infer<typeof addArticleSchema>;

export async function addArticle(
  db: DatabaseConnection,
  otpSecret: string,
  article: AddArticleInput,
) {
  const isOtpValid = await checkOtpCode(otpSecret, article.otp);
  if (!isOtpValid) {
    throw new Error("Invalid OTP code provided");
  }
  console.log("Passed OTP validation");
  await saveArticle(db, article, article.tags);
}

async function checkOtpCode(otpSecret: string, token: string) {
  const isDevBypass = process.env.NODE_ENV === "development";
  if (isDevBypass) {
    console.log("Using dev bypass");
    return true;
  }

  const key = generateKey(() => Buffer.from(otpSecret));
  const issuedToken = await totp(hmac, { secret: { bytes: key.bytes } });
  return issuedToken === token;
}

async function saveArticle(
  db: DatabaseConnection,
  article: Omit<AddArticleInput, "tags">,
  tags: string[],
) {
  try {
    console.log("Starting save of article");
    await db.transaction(async (tx) => {
      const articleId = uuidv7();
      await tx
        .insert(articles)
        .values({ id: articleId, ...article, addedAt: Date.now() });
      await tx
        .insert(articleTags)
        .values(tags.map((tag) => ({ articleId: articleId, tag })));
    });
    console.log("Finished saving of article");
  } catch (cause) {
    throw new Error("Internal server error", { cause });
  }
}
