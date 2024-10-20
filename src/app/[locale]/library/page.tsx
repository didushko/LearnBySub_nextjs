import Library from "@/components/library/Library";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
  return (
    <Suspense key={"Library" + pageNumber} fallback={<div>loading</div>}>
      <Library pageNumber={pageNumber || 1} />
    </Suspense>
  );
}
