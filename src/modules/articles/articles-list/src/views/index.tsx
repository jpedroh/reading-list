import { fetchArticles } from "../services/fetch-articles";
import { ArticlesList } from "./articles-list";

export async function ArticlesListContainer() {
  const articles = await fetchArticles();

  return <ArticlesList articles={articles} />;
}
