import prisma from "../../../shared/prisma";

export async function fetchTags() {
  const tags = await prisma.articleTag.findMany({ distinct: "tag" });
  return tags.map(({ tag }) => ({ value: tag, label: tag }));
}
