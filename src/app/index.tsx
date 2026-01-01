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
} from "@reading-list/modules/shared/ui";
import { Content } from "@reading-list/modules/shared/ui/server";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => ({
    articles: await fetchArticles(),
    availableTags: await fetchAvailableTags(),
  }),
  component: Home,
});

function Home() {
  const { articles, availableTags } = Route.useLoaderData();

  return (
    <>
      <HeaderRoot>
        <HeaderTitle>My Reading List</HeaderTitle>
        <Button asChild>
          <Link href={"/add-article"}>Add new article</Link>
        </Button>
      </HeaderRoot>
      <Content.Root>
        <Content.Aside>
          <ArticlesFilter availableTags={availableTags} />
        </Content.Aside>
        <Content.Main>
          {/* <ArticlesList articles={articles} /> */}
        </Content.Main>
      </Content.Root>
    </>
  );
}
