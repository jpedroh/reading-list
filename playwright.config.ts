import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./e2e/clear-database"),
  globalTeardown: require.resolve("./e2e/clear-database"),
};

export default config;
