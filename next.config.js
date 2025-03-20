/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed experimental.esmExternals option
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
};

module.exports = nextConfig;