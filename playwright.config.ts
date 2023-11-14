import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000"
  },
  globalSetup: require.resolve("./e2e/fixtures/clear-database"),
  globalTeardown: require.resolve("./e2e/fixtures/clear-database"),
  fullyParallel: Boolean(process.env.CI),
  webServer: {
    command: "pnpm run start",
    url: "http://127.0.0.1:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: process.env.CI ? "github" : "list",
});
