import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/create-ballot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
