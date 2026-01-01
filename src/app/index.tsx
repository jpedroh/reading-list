import { ArticlesFilter } from "@reading-list/modules/articles/articles-filter/server";
import { ArticlesList } from "@reading-list/modules/articles/articles-list/server";
import {
  Button,
  HeaderRoot,
  HeaderTitle,
} from "@reading-list/modules/shared/ui";
import { Content } from "@reading-list/modules/shared/ui/server";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <HeaderRoot>
        <HeaderTitle>My Reading List</HeaderTitle>
        <Button asChild>
          {/* <Link href={"/add-article"}>Add new article</Link> */}
        </Button>
      </HeaderRoot>
      <Content.Root>
        <Content.Aside>{/* <ArticlesFilter /> */}</Content.Aside>
        <Content.Main>{/* <ArticlesList /> */}</Content.Main>
      </Content.Root>
    </>
  );
}
