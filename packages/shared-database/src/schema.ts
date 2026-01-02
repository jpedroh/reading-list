import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("Article", {
  id: text("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  addedAt: integer("addedAt").notNull(),
});

export const articlesRelations = relations(articles, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const articleTags = sqliteTable(
  "ArticleTag",
  {
    id: integer("id").primaryKey(),
    articleId: text("articleId", { length: 36 }).notNull(),
    tag: text("tag", { length: 255 }).notNull(),
  },
  (articleTags) => {
    return {
      articleIdx: index("name_idx").on(articleTags.articleId),
      tagIdx: index("name_idx").on(articleTags.tag),
      uniqueArticleIdTag: uniqueIndex("unique_article_id_tag").on(
        articleTags.articleId,
        articleTags.tag,
      ),
    };
  },
);

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
}));
