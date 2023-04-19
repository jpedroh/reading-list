import { articleTags, db } from "../../../infra/database";

export async function fetchTags() {
  return db
    .select({
      value: articleTags.tag,
      label: articleTags.tag,
    })
    .from(articleTags)
    .groupBy(({ value }) => value);
}
