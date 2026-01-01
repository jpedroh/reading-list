"use client";

import { ChangeEvent } from "react";
import * as S from "./styles";
import { useArticlesFilter } from "@reading-list/shared-articles-filter-provider";
import { Tag } from "../../services/fetch-available-tags";

type Props = {
  availableTags: Tag[];
};

export function TagsFilter({ availableTags }: Props) {
  const { tags, setTags } = useArticlesFilter();

  function toggleTag(evt: ChangeEvent<HTMLInputElement>) {
    const tag = evt.target.name;
    if (tags.includes(tag)) {
      setTags(tags.filter((v) => v !== tag));
    } else {
      setTags([...tags, tag]);
    }
  }

  return (
    <S.Container>
      {availableTags.map((tag) => {
        const checked = tags.includes(tag.name);
        return (
          <S.TagItem checked={checked} key={tag.name}>
            <input
              className="outline-none"
              type="checkbox"
              checked={checked}
              onChange={toggleTag}
              name={tag.name}
            />
            <span>
              {tag.name} ({tag.total})
            </span>
          </S.TagItem>
        );
      })}
    </S.Container>
  );
}
