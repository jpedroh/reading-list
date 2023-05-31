import { expect, test } from "@playwright/test";
import { authenticator } from "otplib";
import { env } from "../modules/shared/env";

const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000";

test.describe("AddArticle", () => {
  test("adds an article", async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.getByRole("button", { name: "Add new article" }).click();

    await page.getByLabel(/url/i).fill("https://example.com");
    await page.getByLabel(/tags/i).fill("Nextjs");
    await page.getByLabel(/tags/i).press("Enter");
    await page.getByLabel(/tags/i).fill("Frontend");
    await page.getByLabel(/tags/i).press("Enter");
    await page.getByLabel(/otp/i).fill(authenticator.generate(env.OTP_SECRET));
    await page
      .getByRole("dialog", { name: "Add new article" })
      .getByRole("button", { name: "Add" })
      .click();

    await page
      .getByRole("link", { name: /example domain/i })
      .waitFor({ state: "visible" });
    await page
      .getByTestId("tags")
      .getByText(/nextjs/i)
      .waitFor({ state: "visible" });
    await page
      .getByTestId("tags")
      .getByText(/frontend/i)
      .waitFor({ state: "visible" });
  });

  test("it shows the page title when I fill the URL", async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.getByRole("button", { name: "Add new article" }).click();

    await page.getByLabel(/url/i).fill("https://example.com");
    await page.press("body", "Tab");

    await expect(page.getByLabel(/title/i)).toHaveValue(/example domain/i);
  });

  test("Ctrl + Space opens the modal", async ({ page }) => {
    await page.goto(BASE_URL);

    expect(
      await page.getByRole("dialog", { name: "Add new article" }).count()
    ).toBe(0);

    await page.press("body", "Control+ ");

    expect(
      await page.getByRole("dialog", { name: "Add new article" }).count()
    ).toBe(1);
  });

  test("providing invalid OTP shows an error message", async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await page.getByRole("button", { name: "Add new article" }).click();

    await page.getByLabel(/url/i).fill("https://example.com");
    await page.getByLabel(/tags/i).fill("Nextjs");
    await page.getByLabel(/tags/i).press("Enter");
    await page.getByLabel(/otp/i).fill("555555");

    await page
      .getByRole("dialog", { name: "Add new article" })
      .getByRole("button", { name: "Add" })
      .click();

    await page.getByText(/invalid otp provided/i).waitFor({ state: "visible" });
  });
});
