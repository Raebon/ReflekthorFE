import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/ui/Toast";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={cn("antialiased", inter.className)}>
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

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-6QEQ77J0HN"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6QEQ77J0HN');`,
        }}
      />
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialisased text-slate-900 dark:text-slate-100">
        <Providers token={session?.accessToken?.accessToken ?? ""}>
          <NextTopLoader
            color={`#7dd3fc`}
            height={2}
            showSpinner={false}
            speed={200}
          />
          <Toaster position="bottom-right" />
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
