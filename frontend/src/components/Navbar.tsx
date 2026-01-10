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
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="h-full flex items-center justify-between px-4 sm:px-8 lg:px-12 mx-auto max-w-screen-xl">
        {/* Left side - Home */}
        <Link href="/" className="flex items-center gap-2 shrink-0 hover:bg-gray-100 rounded px-2 py-1 transition">
          <img src="/images/bluejay_magnifier_transparent.png" className="h-8" alt="JHU Logo" />
          <span className="text-xs sm:text-base">Home</span>
        </Link>

        {/* Right side - Navigation links */}
        <div className="flex items-center">
          {/* Only show these links when logged in */}
          {session && (
            <>
              <Link href="/lost" className="text-xs sm:text-base px-2 py-1 sm:px-4 sm:py-2 hover:bg-gray-100 rounded transition">
                Lost
              </Link>
              <Link href="/found" className="text-xs sm:text-base px-2 py-1 sm:px-4 sm:py-2 hover:bg-gray-100 rounded transition">
                Found
              </Link>
              <Link href="/report" className="text-xs sm:text-base px-2 py-1 sm:px-4 sm:py-2 hover:bg-gray-100 rounded transition">
                Report
              </Link>
            </>
          )}

          {/* Auth section - hidden on mobile */}
          <div className={`hidden md:flex items-center ml-2 pl-2 ${session ? 'border-l' : ''}`}>
            {loading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : session ? (
              <>
                <span className="text-sm text-gray-700 mr-2">
                  <strong>{session.user?.name}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span>Sign out</span>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <LogIn className="w-4 h-4 mr-1" />
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
