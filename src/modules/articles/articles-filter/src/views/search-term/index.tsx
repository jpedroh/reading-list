"use client";

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
      <input
        type="text"
        aria-labelledby={searchTermTitleId}
        className={`border rounded-lg p-3 w-full border-zinc-700 bg-zinc-800 bg-opacity-30 hover:bg-opacity-100 focus:bg-opacity-100 transition-all duration-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-600 outline-none`}
        placeholder="Search"
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
      />
    </>
  );
}
