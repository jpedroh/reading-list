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

export async function addArticle(formData: FormData) {
  const payload = AddArticleSchema.safeParse({
    url: formData.get("url"),
    tags: formData.getAll("tags"),
    otp: formData.get("otp"),
  });

  if (!payload.success) {
    throw new Error("Validation error");
  }

  if (!isOtpValid(payload.data.otp)) {
    throw new Error("Invalid OTP provided");
  }

  await saveArticle(
    {
      id: randomUUID(),
      title: await getTitleFromUrl(payload.data.url),
      url: payload.data.url,
    },
    payload.data.tags
  );

  revalidatePath("/");
}

function isOtpValid(token: string) {
  const isDevBypass = env.VERCEL_ENV !== "production" && token === "000000";
  return authenticator.verify({ token, secret: env.OTP_SECRET }) || isDevBypass;
}

async function getTitleFromUrl(url: string) {
  const pageHtml = await fetch(url).then((r) => r.text());
  const titleElement = parse(pageHtml).querySelector("title");

  if (!titleElement) {
    throw new Error("Could not derive title from URL");
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
