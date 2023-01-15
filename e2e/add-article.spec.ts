import { expect, test } from "@playwright/test";
import { authenticator } from "otplib";
import { env } from "../modules/shared/env";

const BASE_URL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000";

test.describe("AddArticle", () => {
  test("adds an article", async ({ page }) => {
    await page.goto(`${BASE_URL}`);

    await page.getByRole("button", { name: /add new article/i }).click();

    await page.getByLabel(/url/i).fill("https://example.com");
    await page.getByLabel(/tags/i).fill("Nextjs");
    await page.getByLabel(/tags/i).press("Enter");
    await page.getByLabel(/otp/i).type(authenticator.generate(env.OTP_SECRET));

    const navigationPromise = page.waitForNavigation({ url: BASE_URL });
    await page.getByRole("button", { name: /add$/i }).click();
    await navigationPromise;

    expect(
      await page.getByRole("link", { name: /example domain/i }).count()
    ).toBe(1);
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
});
