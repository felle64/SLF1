/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate a static `out` directory for GitHub Pages
  output: "export",
  reactStrictMode: true,
  // Use trailing slashes so GitHub Pages can locate index.html files
  trailingSlash: true,
};

module.exports = nextConfig;
