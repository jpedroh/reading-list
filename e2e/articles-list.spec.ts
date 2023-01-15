import { test, expect } from "@playwright/test";
import prisma from "../modules/shared/prisma";

const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000";

test.describe("ArticleList", () => {
  test.beforeAll(async () => {
    await prisma.article.create({
      data: {
        title: "React Article",
        url: "http://example.com/react",
        addedAt: new Date(),
        tags: {
          create: {
            tag: "React",
          },
        },
      },
    });

    await prisma.article.create({
      data: {
        title: "Angular Article",
        url: "http://example.com/angular",
        addedAt: new Date(),
        tags: {
          create: {
            tag: "Angular",
          },
        },
      },
    });
  });

  test("it shows the articles in the page", async ({ page }) => {
    await page.goto(BASE_URL);
    expect(
      await page.getByRole("link", { name: /react article/i }).count()
    ).toBe(1);
    expect(
      await page.getByRole("link", { name: /angular article/i }).count()
    ).toBe(1);
  });

  test("clicking in an article opens it in a new tab", async ({ page }) => {
    await page.goto(BASE_URL);

    await page.getByRole("link", { name: /react article/i }).click();
    const newTab = await page.waitForEvent("popup");

    const newTabUrl = await newTab.evaluate("location.href");
    expect(newTabUrl).toBe("http://example.com/react");
  });

  test("if I pick a tag only the articles of that tag will be shown", async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    expect(page.getByRole("link", { name: /angular/i })).toBeDefined();
    expect(page.getByRole("link", { name: /react/i })).toBeDefined();

    await page.getByRole("checkbox", { name: /react/i }).check();

    expect(await page.getByRole("link", { name: /react/i }).count()).toBe(1);
    expect(await page.getByRole("link", { name: /angular/i }).count()).toBe(0);
  });

  test("typing in the search box filters the articles", async ({ page }) => {
    await page.goto(BASE_URL);

    expect(page.getByRole("link", { name: /angular/i })).toBeDefined();
    expect(page.getByRole("link", { name: /react/i })).toBeDefined();

    await page.getByRole("textbox", { name: /search/i }).type("react");

    expect(await page.getByRole("link", { name: /react/i }).count()).toBe(1);
    expect(await page.getByRole("link", { name: /angular/i }).count()).toBe(0);
  });
});
