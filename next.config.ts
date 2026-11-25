import type { NextConfig } from "next";

// Static export for Cloudflare Workers static assets (see wrangler.jsonc)
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
