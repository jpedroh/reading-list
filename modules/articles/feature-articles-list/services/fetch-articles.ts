import prisma from "../../../shared/prisma";

export async function fetchArticles() {
  const articles = await prisma.article.findMany({
    include: { tags: true },
    orderBy: { addedAt: "desc" },
  });

  return articles.map((article) => ({
    ...article,
    tags: article.tags.map((v) => v.tag),
    addedAt: article.addedAt.toDateString(),
  }));
}
