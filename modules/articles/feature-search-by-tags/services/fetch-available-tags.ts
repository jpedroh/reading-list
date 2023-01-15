import prisma from "../../../shared/prisma";

export async function fetchAvailableTags() {
  const availableTags = await prisma.articleTag.groupBy({
    by: ["tag"],
    _count: {
      tag: true,
    },
    orderBy: {
      _count: {
        tag: "desc",
      },
    },
  });

  return availableTags.map((tag) => ({ name: tag.tag, total: tag._count.tag }));
}
