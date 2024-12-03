import Library from "@/components/library/Library";
import { notFound } from "next/navigation";
import React from "react";

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page } = searchParams;
  const pageNumber = Number(page);
  if (page && (!pageNumber || pageNumber < 0)) {
    return notFound();
  }
  return <Library pageNumber={pageNumber || 1} />;
}
