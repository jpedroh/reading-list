import { fetchAvailableTags } from "./services/fetch-available-tags";
import { TagsFilter } from "./components/tags-filter";

export async function SearchByTagsEntrypoint() {
  const availableTags = await fetchAvailableTags();

  return <TagsFilter availableTags={availableTags} />;
}
