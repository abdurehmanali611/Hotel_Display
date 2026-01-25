/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  ...(isDev
    ? {}
    : {
        webpack: (config, { isServer }) => {
          return config;
        },
      }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const withPWA = isDev
  ? (config: NextConfig) => config
  : withPWAInit({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: false,
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "offlineCache",
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    });

export default withPWA(nextConfig as any);
