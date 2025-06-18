import type { NextConfig } from "next";

// Deployed to GitHub Pages at https://nijotz.github.io/three.js-page-transition/
// so production builds need to be served from that sub-path. Local `next dev`
// stays at the root for convenience.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/three.js-page-transition" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // No trailingSlash on purpose. With it, every route becomes a directory and
  // GitHub Pages 301-redirects the basePath root (which Next refuses to link
  // with a trailing slash, see vercel/next.js#50784), forcing a full reload
  // that breaks the page transitions. Without it every route is a flat .html
  // file that GitHub Pages serves directly. The landing grid lives at /home so
  // nothing links to the bare root - see src/app/page.tsx.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
