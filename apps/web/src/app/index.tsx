import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/articles-filter";
import { ArticlesList, fetchArticles } from "@reading-list/articles-list";
import { makeDatabaseConnection } from "@reading-list/shared-database/connection";
import {
  Button,
  HeaderRoot,
  HeaderTitle,
  Content,
} from "@reading-list/shared-ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/")({
  loader: createServerOnlyFn(async () => {
    const dbConnection = makeDatabaseConnection({
      authToken: env.TURSO_AUTH_TOKEN,
      url: env.TURSO_CONNECTION_URL,
    });

    return {
      articles: await fetchArticles(dbConnection),
      availableTags: await fetchAvailableTags(dbConnection),
    };
  }),
  component: Home,
});

function Home() {
  const { articles, availableTags } = Route.useLoaderData();

  return (
    <>
      <HeaderRoot>
        <HeaderTitle>My Reading List</HeaderTitle>
        {/* <Button asChild>
          <Link href={"/add-article"}>Add new article</Link>
        </Button> */}
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
