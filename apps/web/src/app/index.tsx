import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/articles-filter";
import { ArticlesList, fetchArticles } from "@reading-list/articles-list";
import { makeDatabaseConnection } from "@reading-list/shared-database/connection";
import { Content, HeaderRoot, HeaderTitle } from "@reading-list/shared-ui";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

const indexLoader = createServerFn().handler(async () => {
  const dbConnection = makeDatabaseConnection({
    authToken: env.TURSO_AUTH_TOKEN,
    url: env.TURSO_CONNECTION_URL,
  });

  return {
    articles: await fetchArticles(dbConnection),
    availableTags: await fetchAvailableTags(dbConnection),
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
