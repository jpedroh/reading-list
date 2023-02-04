import type { NextApiRequest, NextApiResponse } from "next";
import { AddArticleSchema } from "../../modules/articles/domain";
import { addArticle } from "../../modules/articles/feature-add-article/services/add-article";
import { env } from "../../modules/shared/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405);
  }

  const payload = AddArticleSchema.safeParse(req.body);

  if (!payload.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    await addArticle(payload.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }

  if (env.VERCEL) await res.revalidate("/");

  return res.redirect(303, "/");
}
