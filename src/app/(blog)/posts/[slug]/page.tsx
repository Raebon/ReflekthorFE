import Blog from "@/components/blog-page/Blog";
import { config } from "@/config";
import { PostDto } from "@/types/reflektor-api-service";
import { getBlogSeoBySlug } from "@/utils/api/query/getBlogQueryKey";
import axios, { AxiosResponse } from "axios";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  // fetch data
  const seo = await getBlogSeoBySlug(id);
  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent)?.openGraph?.images || [];
  return {
    ...config.seo,
    title: `${seo.metaTitle} | REFLEKTHOR`,
    description: seo.metaDescription,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      //images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

async function getBlogBySlug(body: string) {
  try {
    const response: AxiosResponse<PostDto> = await axios.get(
      `${process.env.API_URL}blogs/${body}`
    );
    return response.data;
  } catch (error) {
    // Handle the error
    throw error;
  }
}

export default async function Page({ params }: Props) {
  const initialData = await getBlogBySlug(params.slug);
  return <Blog slug={params.slug} initialData={initialData} />;
}
