import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/footer";

export default function MainLayout({
  children,
  searchModal,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  searchModal: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
      <Header locale={locale} />
      {searchModal}
      {children}
      <Footer locale={locale} />
    </>
  );
}
