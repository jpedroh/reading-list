import { ArticlesList } from "./components/articles-list";
import { fetchArticles } from "./services/fetch-articles";

export async function ArticlesListEntrypoint() {
  const articles = await fetchArticles();

  return <ArticlesList articles={articles} />;
}
