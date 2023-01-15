import parse from "node-html-parser";
import { authenticator } from "otplib";
import { env } from "../../../shared/env";
import prisma from "../../../shared/prisma";
import { Article } from "../../domain";
import { AddArticleDto } from "../../domain";

export async function addArticle(data: AddArticleDto) {
  if (!isOtpValid(data.otp)) {
    throw new Error("Invalid OTP provided");
  }

  return saveArticle({
    title: await getTitleFromUrl(data.url),
    url: data.url,
    tags: data.tags,
  });
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

function saveArticle(article: Omit<Article, "id" | "addedAt">) {
  return prisma.article
    .create({
      data: {
        ...article,
        addedAt: new Date(),
        tags: {
          createMany: {
            data: article.tags.map((tag) => ({ tag })),
          },
        },
      },
    })
    .catch((cause) => {
      throw new Error("Internal server error", { cause });
    });
}
