import React from "react";
import { IMovie, ITv } from "../../interfaces/media";
import Link from "next/link";
import styles from "./Card.module.css";
import tmdbService from "@/services/tmdb-service";
import PosterImg from "./PosterImg";
import TruncatedText from "../common/TrankatedText";
import StarRating from "./StarRating";
import FlagImg from "../common/FlagImg";
import { getCountryCode, subLanguages } from "@/languages/subLanguages";

const Card = function ({
  media,
  type,
}: {
  media: ITv | IMovie;
  type: "tv" | "movie";
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
        {/* <div
          style={{ height: "85%", aspectRatio: "1/1.5", position: "relative" }}
        > */}
        <PosterImg
          sizes={"220px"}
          posterPath={media.poster_path}
          title={title}
        />
        {/* </div> */}
        <div className={styles.title}>
          <TruncatedText>{title}</TruncatedText>
          <div>{year}</div>
        </div>
      </div>
    </Link>
  );
};
export default Card;
