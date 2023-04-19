import { InferModel } from "drizzle-orm";
import { mysqlTable, varchar, text, timestamp, serial, index, uniqueIndex } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import mysql from 'mysql2/promise';

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
        articleId: varchar("articleId", { length: 36 }).notNull(),
        tag: varchar("tag", { length: 255 }).notNull(),
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

export default async function clearDatabase() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL ?? "");
    const db = drizzle(connection);
    await db.delete(articles).execute()
    await db.delete(articleTags).execute()
}