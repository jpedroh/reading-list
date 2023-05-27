import { Article } from "../../../domain";
import styles from "./index.module.css";

const formatter = new Intl.DateTimeFormat('en-US');

export function ArticleRow({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      className={styles.container}
    >
      <h1>{article.title}</h1>
      <div>
        <span>{formatter.format(new Date(article.addedAt))}</span>
        <ul data-testid="tags">
          {article.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}
