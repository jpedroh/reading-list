"use client";

import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";

export const tagsAtom = atomWithHash("tags", new Array<string>());

export function useSearchTags() {
  const [tags] = useAtom(tagsAtom);
  return tags;
}
