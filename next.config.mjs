import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "jpedroh",
  project: "reading-list",
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
