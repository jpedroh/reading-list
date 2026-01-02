import { useMemo } from "react";
import type { Article } from "../services/fetch-articles";
import { ArticleRow } from "./article-row";
import { useArticlesFilter } from "@reading-list/shared-articles-filter-provider";

type Props = { articles: Article[] };

export function ArticlesList({ articles }: Props) {
  const { tags, searchTerm } = useArticlesFilter();

  const visibleArticles = useMemo(() => {
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
  }, [articles, tags, searchTerm]);

  return (
    <ul className="flex flex-col gap-4">
      {visibleArticles.map((article) => (
        <ArticleRow key={article.id} article={article} />
      ))}
    </ul>
  );
}
