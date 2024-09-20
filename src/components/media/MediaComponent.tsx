import PosterImg from "./PosterImg";
import styles from "./MediaComponent.module.css";
import { IDetailsMovie, IDetailsTv } from "@/interfaces/media";
import tmdbService from "@/services/tmdb-service";
import StarRating from "./StarRating";
import Link from "next/link";

const MediaComponent: React.FC<{
  media: IDetailsTv | IDetailsMovie;
}> = function ({ media }) {
  let { title, year, originalTitle, runtime } =
    tmdbService.getUnitMediaFields(media);

  return (
    <>
      <div className={styles.backdrop}>
        <PosterImg
          backdropPath={media.backdrop_path}
          fallbackSrc={false}
          title="backdrop"
          sizes="100dvw"
        />
      </div>

      <div className={styles.mediaInfo}>
        <div className={styles.tytlePartMobile}>
          <TytlePart
            title={title}
            originalTitle={originalTitle}
            tagLine={(media as any)["tagline"]}
            year={year}
            genres={media.genres.map((g) => g.name).join(", ")}
          />
        </div>
        <div className={styles.sideBlock}>
          <div className={styles.posterPart}>
            <PosterImg
              posterPath={media.poster_path}
              title={title}
              sizes="(max-width: 850px) 100vw, 33vw"
            />
          </div>
          <div className={styles.raitingBlock}>
            <StarRating rate={media.vote_average} multi={true} />
            <div>
              <div>
                {"rate"}: {Math.floor(media.vote_average * 10) / 10}
              </div>
              <div>
                {"voteCount"}: {media.vote_count}
              </div>
            </div>
          </div>
          {runtime && (
            <div>
              {runtime} {"min"}
            </div>
          )}
        </div>
        <div className={styles.mainBlock}>
          <div className={styles.tytlePart}>
            <TytlePart
              title={title}
              originalTitle={originalTitle}
              tagLine={(media as any)["tagline"]}
              year={year}
              genres={media.genres.map((g) => g.name).join(", ")}
            />
          </div>
          <br />
          <div>
            <div>{media.overview}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const TytlePart: React.FC<{
  title: string;
  originalTitle: string;
  tagLine?: string;
  year?: number;
  genres: string;
}> = ({ title, originalTitle, tagLine, year, genres }) => {
  return (
    <>
      <h1>{title}</h1>
      <h4>{originalTitle}</h4>
      <br />
      {tagLine && <blockquote>`{tagLine}`</blockquote>}
      <div>{year}</div>
      <div>{genres}</div>
    </>
  );
};

export default MediaComponent;
