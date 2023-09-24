import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wopee",
  description: "Wopee is the autonomous testing platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className="flex h-screen flex-col items-center justify-center">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
