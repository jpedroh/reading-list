import { expect, test } from "@playwright/test";
import { articles, db } from "@reading-list/modules/shared/database";
import { createArticle } from "../utils/create-article";

test.describe("Search", () => {
  test.skip("if there's an article with a title that contains the search string, it appears on the results", async ({
    page,
  }) => {
    const [articleOne, articleTwo] = [createArticle(), createArticle()];
    await db.insert(articles).values([articleOne, articleTwo]);

    await page.goto("/");

    const articleOneElement = page.getByRole("link", {
      name: articleOne.title,
    });
    const articleTwoElement = page.getByRole("link", {
      name: articleTwo.title,
    });

    await expect(articleOneElement).toBeAttached();
    await expect(articleTwoElement).toBeAttached();

    await page.getByPlaceholder(/search/i).fill(articleOne.title);

    await expect(articleOneElement).toBeAttached();
    await expect(articleTwoElement).not.toBeAttached();
  });
});
