import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable client-side router cache so Keystatic edits are visible
  // immediately on page navigation without a hard refresh.
  experimental: {
    staleTimes: { dynamic: 0, static: 30 },
  },
};

export default nextConfig;
