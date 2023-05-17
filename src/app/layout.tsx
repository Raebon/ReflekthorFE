import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/ui/Toast";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

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
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialisased text-slate-900 dark:text-slate-100">
        <Providers>
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
