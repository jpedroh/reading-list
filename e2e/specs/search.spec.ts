import { expect, test } from "@playwright/test";
import { db, articles } from "../../modules/shared/database";

const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000";

test.describe("Search", () => {
  test("if there's an article with a title that contains the search string, it appears on the results", async ({
    page,
  }) => {
    await db.insert(articles).values([
      {
        id: crypto.randomUUID(),
        title: "A simple Example Title",
        url: "https://example.com",
        addedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: "A completely different Title",
        url: "https://example.com",
        addedAt: new Date(),
      },
    ]);

    await page.goto(`${BASE_URL}`);

    const articleOne = page.getByRole("link", { name: /example title/i });
    const articleTwo = page.getByRole("link", {
      name: /completely different/i,
    });

    await expect(articleOne).toBeAttached();
    await expect(articleTwo).toBeAttached();

    await page.getByPlaceholder(/search/i).fill("example title");

    await expect(articleOne).toBeAttached();
    await expect(articleTwo).not.toBeAttached();
  });
});
