"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, Search, MapPin, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


interface Hero1Props {
  // badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  image: { src: string; alt: string };
}

const Hero1 = ({
  // badge = "✨ Your Website Builder",
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <section className="max-h-screen flex items-start mt-4 sm:mt-8 lg:mt-16 justify-start pt-6">
      <div className="mx-auto max-w-screen-2xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
          
          {/* Left Column */}
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold col-span-1 sm:col-span-6 sm:justify-self-center w-fit text-center">
            {heading}

          </div>
          <div className="text-muted-foreground mb-8 max-w-xl lg:text-2xl lg col-span-1 sm:col-span-6 sm:justify-self-center w-fit text-center">
            {description}
          </div>
          <div className="col-span-1 sm:col-span-6 sm:justify-self-center sm:-mt-10 pb-4">
            <img
              src={image.src}
              alt={image.alt}
              className="h-48 w-auto rounded-md object-contain mx-auto"
            />
          </div>
      

        </div>

        {/* Large action buttons below the hero — three equal columns */}
          <div className=" w-full sm:mt-12">
          {loading ? (
            <span className="px-4 sm:px-40 lg:px-30 text-sm text-gray-500">Loading...</span>
          ) : session ? (
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-5 sm:gap-7">
              <Link href="/lost" className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 sm:py-14 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Search className="h-6 w-6" />
                </div>
                <span className="relative z-10 text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">Search Lost Items</span>
                <span className="relative z-10 text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">Find something you lost</span>
              </Link>

              <Link href="/found" className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 sm:py-14 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-emerald-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="relative z-10 text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">Search Found Items</span>
                <span className="relative z-10 text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">Claim what&apos;s been found</span>
              </Link>

              <Link href="/report" className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-10 sm:py-14 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors duration-300 group-hover:bg-amber-600 group-hover:text-white">
                  <PenLine className="h-6 w-6" />
                </div>
                <span className="relative z-10 text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors duration-300">Report Lost/Found</span>
                <span className="relative z-10 text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">Post an item you found or lost</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
              {buttons.primary && (
                <Button asChild variant="default" className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
       </div>
       
     </section>
  );
};

export const Box = () => {
  return (
    <div className="w-[363px] h-[268px]">
      <div className="fixed top-[568px] left-[454px] w-[363px] h-[268px] bg-[#f3eded] rounded-xl shadow-[0px_0px_0px_transparent,0px_0px_0px_transparent,0px_0px_0px_transparent,0px_0px_0px_transparent]" />
    </div>
  );
};

export { Hero1 };
