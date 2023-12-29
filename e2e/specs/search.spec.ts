import { expect, test } from "@playwright/test";
import { db, articles } from "@reading-list/modules/shared/database";
import { randomBytes } from "crypto";

test.describe("Search", () => {
  test("if there's an article with a title that contains the search string, it appears on the results", async ({
    page,
  }) => {
    const randomTitle = randomBytes(64).toString("base64");
    const anotherRandomTitle = randomBytes(64).toString("base64");

    await db.insert(articles).values([
      {
        id: crypto.randomUUID(),
        title: randomTitle,
        url: "https://example.com",
        addedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: anotherRandomTitle,
        url: "https://example.com",
        addedAt: new Date(),
      },
    ]);

    await page.goto("/");

    const articleOne = page.getByRole("link", { name: randomTitle });
    const articleTwo = page.getByRole("link", {
      name: anotherRandomTitle,
    });

    await expect(articleOne).toBeAttached();
    await expect(articleTwo).toBeAttached();

    await page.getByPlaceholder(/search/i).fill("example title");

    await expect(articleOne).toBeAttached();
    await expect(articleTwo).not.toBeAttached();
  });
});
