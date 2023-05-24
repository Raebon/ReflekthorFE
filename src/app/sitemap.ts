import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.reflekthor.com/",
      lastModified: new Date(),
    },
    {
      url: "https://www.reflekthor.com/posts",
      lastModified: new Date(),
    },
    {
      url: "https://www.reflekthor.com/dashboard",
      lastModified: new Date(),
    },
    {
      url: "https://www.reflekthor.com/profile",
      lastModified: new Date(),
    },
  ];
}
