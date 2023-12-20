import { CreatableSelect } from "@reading-list/modules/shared/ui";
import { AddArticleDialog } from "./add-article-dialog";
import { fetchTags } from "../services/fetch-tags";

export async function AddArticleEntrypoint() {
  const availableTags = await fetchTags();

  return (
    <AddArticleDialog>
      <CreatableSelect
        name="tags"
        required
        isMulti={true}
        options={availableTags}
      />
    </AddArticleDialog>
  );
}
