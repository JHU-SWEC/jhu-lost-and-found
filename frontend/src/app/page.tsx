import { Hero1 } from "@/components/Hero1";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main>
      <Hero1
        badge="✨ Your Website Builder"
        heading="Blocks Built With Shadcn & Tailwind"
        description="Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project."
        buttons={{
          primary: {
            text: "Discover all components",
            url: "https://www.shadcnblocks.com",
          },
          secondary: {
            text: "View on GitHub",
            url: "https://www.shadcnblocks.com",
          },
        }}
        image={{
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
          alt: "Hero section demo image showing interface components",
        }}
      />
    </main>
  );
}
