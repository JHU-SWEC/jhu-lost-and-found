import { Hero1 } from "@/components/Hero1";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main>
      <Hero1
        badge="✨ Your Website Builder"
        heading="JHU Lost and Found"
        description="A community-driven platform for Johns Hopkins students to report, search, and claim lost items on campus.
                    Built by Hopkins students to make finding your stuff a little easier."
        buttons={{
          primary: {
            text: "Log In",
            url: "https://www.shadcnblocks.com",
          },
          secondary: {
            text: "View on GitHub",
            url: "https://github.com/JHU-SWEC/jhu-lost-and-found",
          },
        }}
        image={{
          src: "/images/jhu-logo.svg",
          alt: "Johns Hopkins University logo",
        }}
      />
    </main>
  );
}
