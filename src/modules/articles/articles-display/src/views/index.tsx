import { fetchArticles } from "../services/fetch-articles";
import { ArticlesList } from "./articles-list";

export async function ArticlesDisplay() {
  const articles = await fetchArticles();

  return (
    <>
      <ArticlesList articles={articles} />
    </>
  );
}
