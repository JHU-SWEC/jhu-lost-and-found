import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-xl tracking-wider"
          >
            Home
          </Link>

          {/* Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant = "ghost"
              className="flex items-center justify-center"
              asChild
            >
              <Link href="/login">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
