/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.localhost',
          },
        ],
        destination: '/Admin/:path*',
      },
    ]
  }
};

export default nextConfig;
