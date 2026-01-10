import Navbar from "@/components/Navbar";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Lost and Found",
  description: "JHU Lost and Found App",
  icons: {
    icon: "/images/bluejay_magnifier_transparent.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </SessionProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
