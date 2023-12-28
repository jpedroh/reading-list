"use client";

import { Input } from "@reading-list/modules/shared/ui";
import { useArticlesFilter } from "@reading-list/modules/shared/articles-filter-provider";
import { useId } from "react";

export function SearchTermFilter() {
  const { searchTerm, setSearchTerm } = useArticlesFilter();
  const searchTermTitleId = useId();

  return (
    <>
      <label className="sr-only" id={searchTermTitleId}>
        Search by term
      </label>
      <Input
        aria-labelledby={searchTermTitleId}
        placeholder="Search"
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
      />
    </>
  );
}
