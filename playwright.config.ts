import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  globalSetup: require.resolve("./e2e/clear-database"),
  globalTeardown: require.resolve("./e2e/clear-database"),
  fullyParallel: Boolean(process.env.CI),
  webServer: {
    command: "pnpm run start",
    url: "http://127.0.0.1:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: process.env.CI ? "github" : "list",
});
