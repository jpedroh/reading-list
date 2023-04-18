import { AddArticleEntrypoint } from "../modules/articles/feature-add-article";
import { ArticlesListEntrypoint } from "../modules/articles/feature-articles-list";
import { SearchByTagsEntrypoint } from "../modules/articles/feature-search-by-tags";
import { SearchByTermEntrypoint } from "../modules/articles/feature-search-by-term";
import { ShortcutsGuideEntrypoint } from "../modules/articles/feature-shortcuts-guide";
import styles from "./index.module.css";

export const revalidate = 0;

export const metadata = {
  title: 'Reading List',
};

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1>My Reading List</h1>
        {/* @ts-expect-error Server Component */}
        <AddArticleEntrypoint />
      </header>
      <section className={styles.content}>
        <aside>
          <section>
            <h3>Search by term</h3>
            <SearchByTermEntrypoint />
          </section>
          <section>
            <h3>Tags</h3>
            {/* @ts-expect-error Server Component */}
            <SearchByTagsEntrypoint />
          </section>
          <section>
            <h3>Keyboard Shortcuts</h3>
            <ShortcutsGuideEntrypoint />
          </section>
        </aside>
        <main>
          {/* @ts-expect-error Server Component */}
          <ArticlesListEntrypoint />
        </main>
      </section>
    </>
  );
}
