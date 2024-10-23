import libraryService from "@/services/library-service";
import FavoriteButton from "./FavoriteActionsButtons";
import LibraryActionsButtons from "./LibraryActionsButton";
import style from "./ButtonSection.module.css";

export async function ButtonSection({
  userId,
  mediaId,
  mediaType,
}: {
  userId: string;
  mediaId: number;
  mediaType: "movie" | "tv";
}) {
  const inLibrary = await libraryService.isInLibrary(
    userId,
    mediaId.toString(),
    mediaType
  );

  const inFavorite = await libraryService.isInLibrary(
    userId,
    mediaId.toString(),
    mediaType,
    true
  );

  return (
    <section about="Button section" className={style.container}>
      <LibraryActionsButtons
        userId={userId}
        itemId={mediaId.toString()}
        type={mediaType}
        path={`/media/${mediaType}/${mediaId}`}
        inLibrary={inLibrary}
      />
      <FavoriteButton
        userId={userId}
        itemId={mediaId.toString()}
        type={mediaType}
        path={`/media/${mediaType}/${mediaId}`}
        inFavorite={inFavorite}
      />
    </section>
  );
}
