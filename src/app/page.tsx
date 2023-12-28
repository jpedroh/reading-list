import { ArticlesFilter } from "@reading-list/modules/articles/articles-filter/server";
import { ArticlesList } from "@reading-list/modules/articles/articles-list/server";
import { Button } from "@reading-list/modules/shared/ui";
import { Content, Header } from "@reading-list/modules/shared/ui/server";
import Link from "next/link";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reading List",
};

export default function Home() {
  return (
    <>
      <Header.Root>
        <Header.Title>My Reading List</Header.Title>
        <Button asChild>
          <Link href={"/add-article"}>Add new article</Link>
        </Button>
      </Header.Root>
      <Content.Root>
        <Content.Aside>
          <ArticlesFilter />
        </Content.Aside>
        <Content.Main>
          <ArticlesList />
        </Content.Main>
      </Content.Root>
    </>
  );
}
