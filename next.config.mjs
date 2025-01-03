/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_WEBFLOW_URL || "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "media.giphy.com",
      },
    ],
  },
};

export default nextConfig;
