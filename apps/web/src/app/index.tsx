import {
  addArticle,
  AddArticleDialog,
  addArticleSchema,
} from "@reading-list/add-article";
import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/articles-filter";
import { ArticlesList, fetchArticles } from "@reading-list/articles-list";
import {
  Button,
  Content,
  HeaderRoot,
  HeaderTitle,
} from "@reading-list/shared-ui";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { useState } from "react";

const indexLoader = createServerFn().handler(async ({ context }) => {
  return {
    articles: await fetchArticles(context.db),
    availableTags: await fetchAvailableTags(context.db),
  };
});

const addArticleHandler = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Invalid type provided");
    const payload = Object.fromEntries(data);
    return addArticleSchema.parse(payload);
  })
  .handler(async (ctx) => {
    try {
      await addArticle(ctx.context.db, env.OTP_SECRET, ctx.data);
    } catch (error) {
      console.error(error);
      return "Internal server error";
    }
    throw redirect({ to: "/" });
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
        formActionUrl={addArticleHandler.url}
      />
    </>
  );
}
