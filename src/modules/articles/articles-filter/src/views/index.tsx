import { fetchAvailableTags } from "../services/fetch-available-tags";
import { SearchTermFilter } from "./search-term";
import * as S from "./styles";
import { TagsFilter } from "./tags";

export async function ArticlesFilter() {
  const availableTags = await fetchAvailableTags();

  return (
    <>
      <section>
        <S.Title>Search by term</S.Title>
        <SearchTermFilter />
      </section>

      <section>
        <S.Title>Tags</S.Title>
        <TagsFilter availableTags={availableTags} />
      </section>
    </>
  );
}
