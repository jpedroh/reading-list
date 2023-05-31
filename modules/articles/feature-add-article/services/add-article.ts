"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import parse from "node-html-parser";
import { authenticator } from "otplib";
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

    if (!isOtpValid(payload.data.otp)) {
      return { success: false, error: "Invalid OTP provided" };
    }
    await saveArticle(
      {
        id: randomUUID(),
        title: payload.data.title,
        url: payload.data.url,
      },
      payload.data.tags
    );

    revalidatePath("/");

    return { success: true, data: undefined };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal server error" };
  }
}

function isOtpValid(token: string) {
  const isDevBypass = env.VERCEL_ENV !== "production" && token === "000000";
  return authenticator.verify({ token, secret: env.OTP_SECRET }) || isDevBypass;
}

export async function getTitleFromUrl(url: string) {
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
        })
      );
    });
  } catch (cause) {
    console.error(cause);
    throw new Error("Internal server error", { cause });
  }
}
