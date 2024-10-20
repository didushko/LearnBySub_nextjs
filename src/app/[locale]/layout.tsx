import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import i18nConfig from "../../../i18nConfig";
import { dir } from "i18next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnBySub",
  description: "Learn words from subtitles",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  footer,
  header,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        <Toaster toastOptions={{ duration: 3000, position: "bottom-right" }} />
        <main>
          {header}
          {children}
          {footer}
        </main>
      </body>
    </html>
  );
}
