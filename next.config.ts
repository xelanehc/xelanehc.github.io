import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // If your repository name is not 'xelanehc.github.io', uncomment and set the correct path:
  // basePath: '/your-repo-name',
};

export default nextConfig;
