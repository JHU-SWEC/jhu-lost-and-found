import Navbar from "@/components/Navbar";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";

export const metadata = {
  title: "Lost and Found",
  description: "JHU Lost and Found App",
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
      </body>
    </html>
  );
}
