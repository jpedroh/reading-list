import type { Article } from "../../services/fetch-articles";
import * as S from "./styles";

const formatter = new Intl.DateTimeFormat("en-US");

export function ArticleRow({ article }: { article: Article }) {
  return (
    <S.Container>
      <S.Title href={article.url} target="_blank">
        {article.title}
      </S.Title>
      <S.Info>
        <S.DateAdded>{formatter.format(new Date(article.addedAt))}</S.DateAdded>
        <S.TagsList data-testid="tags">
          {article.tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.TagsList>
      </S.Info>
    </S.Container>
  );
}
