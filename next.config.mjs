/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/admin/:path*", headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cache-Control", value: "no-store" },
    ] }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

