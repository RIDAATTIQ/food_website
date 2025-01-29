import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Sanity se images load karne ke liye
  },
};

export default nextConfig;
