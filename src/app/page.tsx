import { ArticlesDisplay } from "@reading-list/modules/articles/articles-display/server";
import { Button } from "@reading-list/modules/shared/ui";
import { Header } from "@reading-list/modules/shared/ui/server";
import Link from "next/link";
import { twc } from "react-twc";

export const runtime = "edge";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reading List",
};

const Content = twc.div`flex flex-col gap-8 w-full md:grid md:grid-cols-[300px_1fr]`;

export default function Home() {
  return (
    <>
      <Header.Root>
        <Header.Title>My Reading List</Header.Title>
        <Button asChild>
          <Link href={"/add-article"}>Add new article</Link>
        </Button>
      </Header.Root>
      <Content>
        <ArticlesDisplay />
      </Content>
    </>
  );
}
