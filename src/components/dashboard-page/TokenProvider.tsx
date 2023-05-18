"use client";
import React, { FC } from "react";

interface TokenProviderProps {
  children: React.ReactNode;
  token: string;
}
const TokenContext = React.createContext("");
const TokenProvider: FC<TokenProviderProps> = ({ children, token }) => {
  return (
    <TokenContext.Provider value={token ?? ""}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
