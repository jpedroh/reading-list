"use client";

import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import { tagsAtom } from "../../hooks/use-search-tags";
import styles from "./index.module.css";

type Props = {
  availableTags: readonly { name: string; total: number }[];
};

export function TagsFilter({ availableTags }: Props) {
  const [value, setValue] = useAtom(tagsAtom);

  function toggleTag(evt: ChangeEvent<HTMLInputElement>) {
    const tag = evt.target.name;
    if (value.includes(tag)) {
      setValue(value.filter((v) => v !== tag));
    } else {
      setValue([...value, tag]);
    }
  }

  return (
    <div className={styles.container}>
      {availableTags.map((tag) => {
        return (
          <label key={tag.name} data-selected={value.includes(tag.name)}>
            <input
              type="checkbox"
              checked={value.includes(tag.name)}
              onChange={toggleTag}
              name={tag.name}
            />
            <span>
              {tag.name} ({tag.total})
            </span>
          </label>
        );
      })}
    </div>
  );
}
