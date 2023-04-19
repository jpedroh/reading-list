import { CreatableSelect } from "../../shared/components/creatable-select";
import { AddArticleDialog } from "./components/add-article-dialog";
import { fetchTags } from "./services/fetch-tags";

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
