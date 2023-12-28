import { Button } from "@reading-list/modules/shared/ui";
import { Header } from "@reading-list/modules/shared/ui/server";
import Link from "next/link";
import { ArticlesListEntrypoint } from "../../modules/articles/feature-articles-list";
import { SearchByTagsEntrypoint } from "../../modules/articles/feature-search-by-tags";
import { SearchByTermEntrypoint } from "../../modules/articles/feature-search-by-term";
import { ShortcutsGuideEntrypoint } from "../../modules/articles/feature-shortcuts-guide";
import styles from "./index.module.css";

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
      <section className={styles.content}>
        <aside>
          <section>
            <h3>Search by term</h3>
            <SearchByTermEntrypoint />
          </section>
          <section>
            <h3>Tags</h3>
            <SearchByTagsEntrypoint />
          </section>
          <section>
            <h3>Keyboard Shortcuts</h3>
            <ShortcutsGuideEntrypoint />
          </section>
        </aside>
        <main>
          <ArticlesListEntrypoint />
        </main>
      </section>
    </>
  );
}
