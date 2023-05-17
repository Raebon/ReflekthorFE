"use client";
import { FC } from "react";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";
interface LoadingPageIndicatiorProps {}

const LoadingPageIndicatior: FC<LoadingPageIndicatiorProps> = ({}) => {
  const { theme } = useTheme();
  return (
    <NextTopLoader
      color={`${theme === "light" ? "#0f172a" : "#0ea5e9"}`}
      height={theme === "light" ? 2 : 2.5}
      showSpinner={false}
      speed={200}
    />
  );
};

export default LoadingPageIndicatior;
