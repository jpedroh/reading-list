"use client";

import { useId } from "react";
import { useArticlesFilter } from "../../hooks/use-articles-filter";
import { TagsFilter } from "./tags";
import { Title } from "./styles";

type Props = {
  availableTags: readonly { name: string; total: number }[];
};

export function ArticlesFilter({ availableTags }: Props) {
  const { searchTerm, setSearchTerm } = useArticlesFilter();
  const searchTermTitleId = useId();

  return (
    <>
      <section>
        <Title id={searchTermTitleId}>Search by term</Title>
        <input
          type="text"
          aria-labelledby={searchTermTitleId}
          className={`border rounded-lg p-3 w-full border-zinc-700 bg-zinc-800 bg-opacity-30 hover:bg-opacity-100 focus:bg-opacity-100 transition-all duration-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 outline-none`}
          placeholder="Search"
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </section>

      <section>
        <Title>Tags</Title>
        <TagsFilter availableTags={availableTags} />
      </section>
    </>
  );
}
