'use client'

import { Article } from "../../../domain"
import { useFilterArticles } from "../../hooks/use-filter-articles"
import { ArticleRow } from "../article-row"

type Props = { articles: Article[] }

export function ArticlesList({ articles }: Props) {
    const visibleArticles = useFilterArticles(articles);

    return <>{visibleArticles.map((article) => <ArticleRow key={article.id} article={article} />)}</>
}