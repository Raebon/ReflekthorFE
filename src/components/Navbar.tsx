"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileDropdown from "@/components/ProfileDropdown";
import { getServerSession } from "next-auth";
import { buttonVariants } from "./ui/Button";
import SignInButton from "./SignInButton";
import { authOptions } from "@/lib/auth";
import { TokenContext } from "@/components/Providers";
import React from "react";

const Navbar = () => {
  const token = React.useContext(TokenContext);
  return (
    <div className="sticky backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 dark:border-b dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className={"text-4xl font-bold tracking-tighter leading-tight"}
        >
          Reflektor.
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          {/* Todo component - dropdown */}

          {/* <ProfileDropdown /> */}
          {token ? (
            <>
              {/*               <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/dashboard"
              >
                Dashboard
              </Link> */}
              <ProfileDropdown />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
