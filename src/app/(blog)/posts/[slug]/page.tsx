import Blog from "@/components/blog-page/Blog";
import { config } from "@/config";
import { getBlogSeoBySlug } from "@/utils/api/query/getBlogQueryKey";
import type { Metadata, ResolvingMetadata } from "next";

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

export default function Page({ params }: Props) {
  return <Blog slug={params.slug} />;
}
