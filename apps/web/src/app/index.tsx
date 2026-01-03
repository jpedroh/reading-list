import { AddArticleDialog } from "@reading-list/add-article";
import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/articles-filter";
import { ArticlesList, fetchArticles } from "@reading-list/articles-list";
import { Button, Content, HeaderRoot, HeaderTitle } from "@reading-list/shared-ui";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

const indexLoader = createServerFn().handler(async ({ context }) => {
  return {
    articles: await fetchArticles(context.db),
    availableTags: await fetchAvailableTags(context.db),
  };
});

export const Route = createFileRoute("/")({
  loader: () => indexLoader(),
  component: Home,
});

function Home() {
  const { articles, availableTags } = Route.useLoaderData();
  const [addArticleDialog, setAddArticleDialog] = useState(false);

  return (
    <>
      <HeaderRoot>
        <HeaderTitle>My Reading List</HeaderTitle>
        <Button onPress={() => setAddArticleDialog(true)}>Add article</Button>
      </HeaderRoot>
      <Content.Root>
        <Content.Aside>
          <ArticlesFilter availableTags={availableTags} />
        </Content.Aside>
        <Content.Main>
          <ArticlesList articles={articles} />
        </Content.Main>
      </Content.Root>
      <AddArticleDialog
        isOpen={addArticleDialog}
        onDismiss={() => setAddArticleDialog(false)}
        availableTags={availableTags.map((tag) => tag.name)}
      />
    </>
  );
}
