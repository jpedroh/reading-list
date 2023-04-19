import { randomUUID } from "crypto";
import parse from "node-html-parser";
import { authenticator } from "otplib";
import { articles, articleTags, db, NewArticle } from "../../../shared/database";
import { env } from "../../../shared/env";
import { AddArticleDto } from "../../domain";

export async function addArticle(data: AddArticleDto) {
  if (!isOtpValid(data.otp)) {
    throw new Error("Invalid OTP provided");
  }

  return saveArticle({
    id: randomUUID(),
    title: await getTitleFromUrl(data.url),
    url: data.url,
  }, data.tags);
}

function isOtpValid(token: string) {
  if (env.VERCEL_ENV !== "production") return token === "000000";
  return authenticator.verify({ token, secret: env.OTP_SECRET });
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
      await tx.insert(articleTags).values(tags.map(tag => {
        return { articleId: article.id, tag };
      }));
    });
  } catch (cause) {
    console.error(cause)
    throw new Error("Internal server error", { cause });
  }
}
