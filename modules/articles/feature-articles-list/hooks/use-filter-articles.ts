import { Article } from "../../domain";
import { useSearchTags } from "../../feature-search-by-tags/hooks/use-search-tags";
import { useSearchTerm } from "../../feature-search-by-term";

export function useFilterArticles(articles: Article[]) {
  const searchTerm = useSearchTerm();
  const tags = useSearchTags();

  let visibleArticles = articles;
  if (tags && tags.length > 0) {
    visibleArticles = visibleArticles.filter((article) => {
      return article.tags.some((tag) => tags.includes(tag));
    });
  }
  if (searchTerm && searchTerm.length > 0) {
    visibleArticles = visibleArticles.filter((article) => {
      return article.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return visibleArticles;
}
