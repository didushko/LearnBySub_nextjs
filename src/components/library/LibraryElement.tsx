import tmdbService from "@/services/tmdb-service";
import Link from "next/link";
import styles from "./LibraryElement.module.css";
import PosterImg from "../media/PosterImg";
import FavoriteButton from "../common/buttons/FavoriteActionsButtons";

export default async function LibraryElement({
  userId,
  id,
  type,
  favorite,
  priority = false,
}: {
  userId: string;
  id: number | string;
  type: "tv" | "movie";
  favorite: boolean;
  priority?: boolean;
}) {
  const media = await tmdbService.getDetails(type, id, "en");
  const { title, year, originalTitle, runtime } =
    tmdbService.getUnitMediaFields(media);
  return (
    <Link
      key={media.id}
      href={`media/${type}/${media.id}`}
      className={styles.linkContainer}
    >
      <div className={styles.element} tabIndex={0}>
        <div className={styles.mediaInfo}>
          <div className={styles.imageContainer}>
            <PosterImg
              sizes="70px"
              posterPath={media.poster_path}
              title={title}
              priority={priority}
            />
          </div>
          <div>
            <div className={styles.text}>{title}</div>
            <div className={styles.text}>{year}</div>
            <div className={styles.text}>{type}</div>
          </div>
        </div>
        <FavoriteButton
          userId={userId}
          itemId={id.toString()}
          type={type}
          inFavorite={favorite}
          path="library"
        />
        <PosterImg
          backdropPath={media.backdrop_path}
          fallbackSrc={false}
          title=""
          sizes="80dvw"
          backdropSize="w780"
        />
      </div>
    </Link>
  );
}
