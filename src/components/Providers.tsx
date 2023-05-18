"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query/devtools";

interface ProvidersProps {
  children: ReactNode;
  token: string;
}
export const TokenContext = React.createContext("");
const Providers: FC<ProvidersProps> = ({ children, token }) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/*todo session provider */}
      <SessionProvider>
        <TokenContext.Provider value={token ?? ""}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </TokenContext.Provider>
      </SessionProvider>
      {/*   <ReactQueryDevtools initialIsOpen={false} /> */}
    </ThemeProvider>
  );
};

export default Providers;
