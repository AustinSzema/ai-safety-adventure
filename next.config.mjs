/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Ensure trailing slashes for static exports
  output: 'export', // Ensure it exports static files
  assetPrefix: './', // Make assets work in the relative environment
};

export default nextConfig;
