"use client";

import React from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <Link href="/" className="D">
        <img src="/images/jhu-logo.svg" className="h-3" alt="JHU Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Home</span>
      </Link>

        <div className="flex items-center ">
          {/* Logo */}
          <Link href="/lost" className="text-xl flex flex-col p-4">
            Lost Items
          </Link>
          <Link href="/found" className="text-xl flex flex-col p-4">
            Found Items
          </Link>
          <Link href="/report" className="text-xl flex flex-col p-4">
            Report Items
          </Link>

          {/* Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <>
                <span className="text-sm text-gray-700">
                  Signed in as{" "}
                  <strong>{session.user?.name}</strong>
                </span>
                <Button
                  variant="ghost"
                  className="flex items-center justify-center"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span>Sign out</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center justify-center"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <LogIn className="w-5 h-5 mr-1" />
                <span>Login</span>
              </Button>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
