/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a static `out` directory for GitHub Pages
  output: "export",
  reactStrictMode: true,
  // Use trailing slashes so GitHub Pages can locate index.html files
  trailingSlash: true,
  images: {
    // Disable dynamic image optimization for static export
    unoptimized: true,
  },
};

module.exports = nextConfig;
