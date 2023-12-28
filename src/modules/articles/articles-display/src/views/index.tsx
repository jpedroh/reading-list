import { fetchArticles } from "../services/fetch-articles";
import { fetchAvailableTags } from "../services/fetch-available-tags";
import { ArticlesFilter } from "./articles-filter";
import { ArticlesList } from "./articles-list";

export async function ArticlesDisplay() {
  const [articles, availableTags] = await Promise.all([
    fetchArticles(),
    fetchAvailableTags(),
  ]);

  return (
    <>
      <aside className="flex flex-col gap-8 sticky bottom-6 self-end w-full md:w-[unset]">
        <ArticlesFilter availableTags={availableTags} />
      </aside>
      <main className="flex-grow flex flex-col gap-4">
        <ArticlesList articles={articles} />
      </main>
    </>
  );
}
