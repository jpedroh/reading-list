import { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  foreignKey,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { Pool } from "pg";
import { env } from "./env";

export const articles = pgTable("Article", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Article = InferModel<typeof articles>;
export type NewArticle = InferModel<typeof articles, "insert">;

export const articleTags = pgTable(
  "ArticleTag",
  {
    articleId: uuid("articleId").primaryKey(),
    tag: text("tag").primaryKey(),
  },
  (articleTags) => {
    return {
      articleFk: foreignKey({
        columns: [articleTags.articleId],
        foreignColumns: [articles.id],
      }),
    };
  }
);

export type ArticleTag = InferModel<typeof articleTags>;
export type NewArticleTag = InferModel<typeof articleTags, "insert">;

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool);
