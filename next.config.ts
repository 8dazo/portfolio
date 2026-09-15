import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
        port: "",
        pathname: "/name/**",
        search:
          "?token=pk_B1VUNMm5Sn2YMS55trXKEw&size=128&format=png&theme=light&retina=true",
      },
    ],
  },
};

export default nextConfig;
