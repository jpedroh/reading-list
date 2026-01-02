import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";

const searchTermAtom = atomWithHash("searchTerm", "");
const tagsAtom = atomWithHash("tags", new Array<string>());

type UseArticlesFilter = {
  searchTerm: string;
  tags: string[];
  setSearchTerm: (x: string) => void;
  setTags: (x: string[]) => void;
};

export function useArticlesFilter(): UseArticlesFilter {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [tags, setTags] = useAtom(tagsAtom);

  return { searchTerm, tags, setSearchTerm, setTags };
}
