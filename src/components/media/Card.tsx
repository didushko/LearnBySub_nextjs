import React, { Suspense } from "react";
import { IMovie, ITv } from "../../interfaces/media";
import Link from "next/link";
import styles from "./Card.module.css";
import tmdbService from "@/services/tmdb-service";
import PosterImage from "./PosterImg";
import TruncatedText from "../common/TruncatedText";
import StarRating from "./StarRating";
import FlagImg from "../common/FlagImg";
import { getCountryCode } from "@/languages/subLanguages";

const Card = function ({
  media,
  type,
  index,
}: {
  media: ITv | IMovie;
  type: "tv" | "movie";
  index: number;
}) {
  let { title, year } = tmdbService.getUnitMediaFields(media);
  return (
    <Link href={`media/${type}/${media.id}`}>
      <div className={styles.card}>
        <div className={styles.raite}>
          <StarRating rate={media.vote_average} />
        </div>
        <div className={styles.lang}>
          <FlagImg countryCode={getCountryCode(media.original_language)} />
        </div>
        <PosterImage
          sizes={220}
          posterPath={media.poster_path}
          title={title}
          priority={index < 0}
        />
        <div className={styles.title}>
          <TruncatedText>{title}</TruncatedText>
          <div>{year || null}</div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
