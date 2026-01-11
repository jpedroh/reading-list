import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/articles-filter";
import { ArticlesList, fetchArticles } from "@reading-list/articles-list";
import { Content, HeaderRoot, HeaderTitle } from "@reading-list/shared-ui";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

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

  return (
    <>
      <HeaderRoot>
        <HeaderTitle>My Reading List</HeaderTitle>
      </HeaderRoot>
      <Content.Root>
        <Content.Aside>
          <ArticlesFilter availableTags={availableTags} />
        </Content.Aside>
        <Content.Main>
          <ArticlesList articles={articles} />
        </Content.Main>
      </Content.Root>
    </>
  );
}
