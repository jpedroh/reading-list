import { fetchTags } from "../services/fetch-tags";
import { AddArticleDialog } from "./add-article-dialog";

export async function AddArticleEntrypoint() {
  const availableTags = await fetchTags();

  return <AddArticleDialog availableTags={availableTags} />;
}
