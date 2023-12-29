import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import { nxE2EPreset } from "@nx/playwright/preset";

dotenv.config();

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: "./e2e" }),
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm run serve",
    url: "http://127.0.0.1:3000",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  reporter: process.env.CI ? "github" : "list",
});
