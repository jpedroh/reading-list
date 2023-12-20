"use client";

import { useKeyboardInteraction } from "@reading-list/modules/shared/ui";
import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";
import { useRef } from "react";
import styles from "./index.module.css";

const searchTermAtom = atomWithHash("searchTerm", "");

export function useSearchTerm() {
  const [searchTerm] = useAtom(searchTermAtom);
  return searchTerm;
}

export function SearchByTermEntrypoint() {
  useKeyboardInteraction({
    key: "K",
    interaction: () => searchRef.current?.focus(),
  });

  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <input
      type="text"
      ref={searchRef}
      className={styles.container}
      placeholder="Search"
      value={searchTerm}
      onChange={(evt) => setSearchTerm(evt.target.value?.trim())}
    />
  );
}
