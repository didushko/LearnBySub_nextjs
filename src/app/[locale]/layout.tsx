import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import i18nConfig from "../../../i18nConfig";
import { dir } from "i18next";
import Header from "@/components/header/Header";
import HideOnAuthPagesWrapper from "@/components/common/hide-on-auth-pages-wrapper";
import Footer from "@/components/footer/footer";

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
  modal,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        
        <Toaster toastOptions={{ duration: 3000, position: "bottom-right" }} />
        <main>
          <Header locale={locale} />
          {modal}
          {children}
          <HideOnAuthPagesWrapper>
            <Footer locale={locale} />
          </HideOnAuthPagesWrapper>
        </main>
      </body>
    </html>
  );
}
