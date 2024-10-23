import PosterImg from "./PosterImg";
import styles from "./MediaComponent.module.css";
import { IDetailsMovie, IDetailsTv } from "@/interfaces/media";
import tmdbService from "@/services/tmdb-service";
import StarRating from "./StarRating";
import { auth } from "@/services/auth-service";
import SubtitlesSection from "./SubtitlesSection";
import React from "react";
import { ButtonSection } from "../common/buttons/ButtonSection";
import initTranslations from "@/commons/i18n";

const MediaComponent: React.FC<{
  media: IDetailsTv | IDetailsMovie;
  type: "movie" | "tv";
  seasonIndex?: string;
  episodeIndex?: string;
  showModal?: "idioms" | "phrases" | "words" | undefined;
  locale: string;
}> = async function ({
  media,
  type,
  seasonIndex,
  episodeIndex,
  showModal,
  locale,
}) {
  const session = await auth();
  const { t } = await initTranslations(locale, ["media"]);
  const { title, year, originalTitle, runtime } =
    tmdbService.getUnitMediaFields(media);

  const buttonSection = (
    <ButtonSection
      userId={session.user.id}
      mediaId={media.id}
      mediaType={type}
    />
  );

  return (
    <>
      <div className={styles.backgroundImage}>
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
                {t("rate")}: {Math.floor(media.vote_average * 10) / 10}
              </div>
              <div>
                {t("voteCount")}: {media.vote_count}
              </div>
            </div>
          </div>
          {runtime && (
            <div>
              {runtime} {t("min")}
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
            <br />
            <div>{media.overview || t("no_overview")}</div>
          </div>
          {buttonSection}
          <SubtitlesSection
            userId={session.user.id}
            media={media}
            originalName={originalTitle}
            type={type}
            seasonIndex={seasonIndex}
            episodeIndex={episodeIndex}
            showModal={showModal}
          />
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
      <div>
        <h1>{title}</h1>
      </div>
      <h4>{originalTitle}</h4>
      <br />
      {tagLine && <blockquote>`{tagLine}`</blockquote>}
      <div>{year || null}</div>
      <div>{genres || null}</div>
    </>
  );
};

export default MediaComponent;
