import { FullConfig } from "@playwright/test";
import prisma from "../modules/shared/prisma";

export default async function clearDatabase(config: FullConfig) {
  await prisma.article.deleteMany();
}
