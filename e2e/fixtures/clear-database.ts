import { articleTags, articles, db } from "../../modules/shared/database";

export default async function clearDatabase() {
  await db.delete(articles).execute();
  await db.delete(articleTags).execute();
}
