"use server";

import {
  NewArticle,
  articleTags,
  articles,
  db,
} from "@reading-list/modules/shared/database";
import { env } from "@reading-list/modules/shared/env";
import { revalidatePath } from "next/cache";
import { generateKey, totp } from "otp-io";
import { hmac } from "otp-io/crypto";
import { z } from "zod";

type Result<T> = { success: true; data: T } | { success: false; error: string };

const addArticleSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  tags: z.preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string())),
  otp: z.string().max(6),
});

export async function addArticle(formData: FormData): Promise<Result<void>> {
  try {
    const payload = addArticleSchema.safeParse({
      url: formData.get("url"),
      title: formData.get("title"),
      tags: formData.getAll("tags"),
      otp: formData.get("otp"),
    });

    if (!payload.success) {
      return { success: false, error: "Validation error" };
    }

    if (!(await isOtpValid(payload.data.otp))) {
      return { success: false, error: "Invalid OTP provided" };
    }
    await saveArticle(
      {
        // eslint-disable-next-line
        id: self.crypto.randomUUID(),
        title: payload.data.title,
        url: payload.data.url,
      },
      payload.data.tags,
    );

    revalidatePath("/");

    return { success: true, data: undefined };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error" };
  }
}

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
