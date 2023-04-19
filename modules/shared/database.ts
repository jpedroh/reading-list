import { connect } from "@planetscale/database";
import { InferModel } from "drizzle-orm";
import {
  index,
  mysqlTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "./env";

export const articles = mysqlTable("Article", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Article = InferModel<typeof articles>;
export type NewArticle = InferModel<typeof articles, "insert">;

export const articleTags = mysqlTable(
  "ArticleTag",
  {
    id: serial("id").primaryKey(),
    articleId: varchar("articleId", { length: 36 }),
    tag: varchar("tag", { length: 255 }),
  },
  (articleTags) => {
    return {
      articleIdx: index("name_idx").on(articleTags.articleId),
      tagIdx: index("name_idx").on(articleTags.tag),
      uniqueArticleIdTag: uniqueIndex("unique_article_id_tag").on(
        articleTags.articleId,
        articleTags.tag
      ),
    };
  }
);

export type ArticleTag = InferModel<typeof articleTags>;
export type NewArticleTag = InferModel<typeof articleTags, "insert">;

const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);
