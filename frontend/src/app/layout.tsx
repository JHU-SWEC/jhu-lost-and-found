import Navbar from "@/components/Navbar";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "JHU Lost and Found",
  description:
    "A Lost and Found platform made by and for Johns Hopkins University students. Report lost items, find what you've lost, and help reunite belongings with their owners across campus.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "JHU Lost and Found",
    description:
      "A Lost and Found platform made by and for Johns Hopkins University students. Report lost items and help reunite belongings with their owners.",
    type: "website",
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
