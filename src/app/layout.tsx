import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnBySub",
  description: "Learn words from subtitles",
};

export default function RootLayout({
  children,
  footer,
  header,
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {header}
          {children}
          {footer}
        </main>
      </body>
    </html>
  );
}
