/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.HOSTNAME_BlOB}`, //todo env
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/users/profile",
        destination: `${process.env.API_URL}users/profile`,
      },
      {
        source: "/blogs/posts",
        destination: `${process.env.API_URL}blogs/posts`,
      },
      {
        source: "/blogs/categories",
        destination: `${process.env.API_URL}blogs/categories`,
      },
      {
        source: "/blogs",
        destination: `${process.env.API_URL}blogs`,
      },
      {
        source: "/blogs/:slug",
        destination: `${process.env.API_URL}blogs/:slug`,
      },
    ];
  },
};

module.exports = nextConfig;
