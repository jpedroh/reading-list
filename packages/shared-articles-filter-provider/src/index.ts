import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";

const searchTermAtom = atomWithHash<string>("searchTerm", "");
const tagsAtom = atomWithHash<string[]>("tags", []);

export function useArticlesFilter() {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [tags, setTags] = useAtom(tagsAtom);

  return { searchTerm, tags, setSearchTerm, setTags };
}
