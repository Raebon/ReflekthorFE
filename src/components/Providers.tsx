"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query/devtools";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/*todo session provider */}
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
      {/*   <ReactQueryDevtools initialIsOpen={false} /> */}
    </ThemeProvider>
  );
};

export default Providers;
