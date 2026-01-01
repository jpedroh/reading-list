import {
  ArticlesFilter,
  fetchAvailableTags,
} from "@reading-list/modules/articles/articles-filter";
import {
  ArticlesList,
  fetchArticles,
} from "@reading-list/modules/articles/articles-list";
import {
  Button,
  HeaderRoot,
  HeaderTitle,
  Content,
} from "@reading-list/shared-ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";

export const Route = createFileRoute("/")({
  loader: createServerOnlyFn(async () => ({
    articles: await fetchArticles(),
    availableTags: await fetchAvailableTags(),
    // articles: [],
    // availableTags: [],
  })),
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
