"use server";

import { revalidatePath } from "next/cache";
import parse from "node-html-parser";
import { generateKey, totp } from "otp-io";
import { hmac } from "otp-io/crypto";

import { string } from "zod";
import {
  articles,
  articleTags,
  db,
  NewArticle,
} from "../../../shared/database";
import { env } from "../../../shared/env";
import { AddArticleSchema } from "../../domain";

type Result<T> = { success: true; data: T } | { success: false; error: string };

export async function addArticle(formData: FormData): Promise<Result<void>> {
  try {
    const payload = AddArticleSchema.safeParse({
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

export async function getTitleFromUrl(url: string) {
  if (string().url().safeParse(url).success === false) {
    return "";
  }

  const pageHtml = await fetch(url).then((r) => r.text());
  const titleElement = parse(pageHtml).querySelector("title");

  if (!titleElement) {
    return "";
  }

  return titleElement.innerText;
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
    console.error(cause);
    throw new Error("Internal server error", { cause });
  }
}
