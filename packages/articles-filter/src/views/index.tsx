import type { Tag } from "../services/fetch-available-tags";
import { SearchTermFilter } from "./search-term";
import * as S from "./styles";
import { TagsFilter } from "./tags";

type Props = {
  availableTags: Tag[];
};

export function ArticlesFilter({ availableTags }: Props) {
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
