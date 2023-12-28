"use client";

import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";

const searchTermAtom = atomWithHash("searchTerm", "");
const tagsAtom = atomWithHash("tags", new Array<string>());

export function useArticlesFilter() {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [tags, setTags] = useAtom(tagsAtom);

  return { searchTerm, tags, setSearchTerm, setTags };
}
