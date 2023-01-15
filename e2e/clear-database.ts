import prisma from "../modules/shared/prisma";

export default async function clearDatabase() {
  await prisma.article.deleteMany();
}
