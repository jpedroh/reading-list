import { Input } from "@reading-list/shared-ui";
import { useArticlesFilter } from "@reading-list/shared-articles-filter-provider";
import { useId } from "react";

export function SearchTermFilter() {
  const { searchTerm, setSearchTerm } = useArticlesFilter();
  const searchTermTitleId = useId();

  return (
    <>
      <label className="sr-only" htmlFor={searchTermTitleId}>
        Search by term
      </label>
      <Input
        id={searchTermTitleId}
        placeholder="Search"
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
      />
    </>
  );
}
