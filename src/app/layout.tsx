import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/ui/Toast";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import LoadingPageIndicatior from "@/components/LoadingPageIndicatior";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      ></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      ></link>
      <link rel="manifest" href="static/site.webmanifest"></link>
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5"
      ></link>
      <meta name="msapplication-TileColor" content="#000000"></meta>
      <meta name="theme-color" content="#ffffff"></meta>

      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialisased text-slate-900 dark:text-slate-100">
        <Providers>
          {/*     <LoadingPageIndicatior /> */}
          <NextTopLoader
            color={`#7dd3fc`}
            height={2}
            showSpinner={false}
            speed={200}
          />
          <Toaster position="bottom-right" />

          {/* @ts-expect-error Server component*/}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
        {/* Allow for more height on mobile devices */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
