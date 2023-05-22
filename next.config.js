/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.HOSTNAME_BLOB}`, //todo env
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
        source: "/blogs/categories/:id",
        destination: `${process.env.API_URL}blogs/categories/:id`,
      },
      {
        source: "/blogs",
        destination: `${process.env.API_URL}blogs`,
      },
      {
        source: "/blogs/:slug",
        destination: `${process.env.API_URL}blogs/:slug`,
      },
      {
        source: "/blogs/:slug/seo",
        destination: `${process.env.API_URL}blogs/:slug/seo`,
      },
    ];
  },
};

module.exports = nextConfig;
