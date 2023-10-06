import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management App.",
  description:
    "This app is a user management app built with Next.js for highlight my skills in React, TypeScript, and Next.js.",
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
          <main>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
