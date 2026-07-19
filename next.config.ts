import type { NextConfig } from "next";

// GitHub Pages serves the site at /taco-inn/ — set PAGES_BASE=/taco-inn when
// building for Pages. Local dev and other hosts (Vercel, custom domain) build
// with no base path.
const basePath = process.env.PAGES_BASE || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // unoptimized=true disables Next.js image optimization — static export requires it.
  // To get WebP/AVIF + responsive sizes, images must be pre-converted at build time
  // (e.g. sharp CLI) rather than relying on the Next.js Image Optimization API.
  images: { unoptimized: true },
};

export default nextConfig;
