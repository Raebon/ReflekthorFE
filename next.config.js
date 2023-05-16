/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reflecthorstorage.blob.core.windows.net",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/users/profile",
        destination:
          "https://reflekthorappservice.azurewebsites.net/users/profile",
      },
      {
        source: "/blogs/posts",
        destination:
          "https://reflekthorappservice.azurewebsites.net/blogs/posts",
      },
      {
        source: "/blogs",
        destination: "https://reflekthorappservice.azurewebsites.net/blogs",
      },
      {
        source: "/blogs/:slug",
        destination:
          "https://reflekthorappservice.azurewebsites.net/blogs/:slug",
      },
    ];
  },
};

module.exports = nextConfig;
