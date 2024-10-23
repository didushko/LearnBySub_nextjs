import libraryService from "@/services/library-service";
import { notFound } from "next/navigation";
import PaginationBar from "../common/PaginationBar";
import { auth } from "@/services/auth-service";
import style from "./Library.module.css";
import LibraryElement from "./LibraryElement";
import { Suspense } from "react";

interface ILibraryProps {
  pageNumber: number;
}

async function Library({ pageNumber }: { pageNumber: number }) {
  const session = await auth();
  const libraryPaginations = await libraryService.getLibraryItemsById(
    session.user.id,
    pageNumber
  );
  if (pageNumber > libraryPaginations.totalPages) {
    return notFound();
  }
  if (!libraryPaginations.totalItems) {
    return <div>Library empty right now</div>;
  }
  return (
    <div className={style.library}>
      <div className={style.libraryList}>
        {libraryPaginations.items.map((media, i) => (
          <LibraryElement
            key={"library" + media.type + media.id}
            userId={session.user.id}
            id={media.id}
            type={media.type}
            favorite={media.favorite}
            priority={i < 2}
          />
        ))}
      </div>
      <PaginationBar
        currentPage={pageNumber}
        totalPages={libraryPaginations.totalPages}
      />
    </div>
  );
}

const LibraryWithSuspense = async (args: ILibraryProps) => (
  <Suspense key={args.toString()} fallback={<div>loading</div>}>
    <Library {...args} />
  </Suspense>
);

export default LibraryWithSuspense
