import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/cosentino-prototipo-fase-ii" : "",
  assetPrefix: isProd ? "/cosentino-prototipo-fase-ii/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
