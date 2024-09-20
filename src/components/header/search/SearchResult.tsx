import React, { Suspense } from "react";
import tmdbService from "@/services/tmdb-service";
import Link from "next/link";
import styles from "./SearchResult.module.css";
import PosterImg from "@/components/media/PosterImg";

export default async function SearchResult({
  query,
}: {
  query: string;
  callback?: Function;
}) {
  if (!query) {
    return (
      <div className={styles.result}>
        <span>Last searches:</span>
      </div>
    );
  }

  if (query.length < 2) {
    return (
      <div className={styles.result}>
        <span>Please at least 2 symbols...</span>
      </div>
    );
  }
  try {
    const data = (
      await tmdbService.search({
        query,
        adult: false,
        language: "en",
        page: 1,
      })
    ).results;

    if (data.length === 0) {
      return (
        <div className={styles.result}>
          <span>No result for query: {query}</span>
        </div>
      );
    }
    return (
      <div className={styles.result}>
        {data.map((media) => {
          let { title, year } = tmdbService.getUnitMediaFields(media);
          return (
            <Link key={media.id} href={`media/${media.media_type}/${media.id}`}>
              <div className={styles.resultContainer}>
                <div className={styles.imageContainer}>
                  <PosterImg
                    sizes="70px"
                    posterPath={media.poster_path}
                    title={title}
                  />
                </div>
                <div>
                  <div>{title}</div>
                  <div>{year}</div>
                  <div>{media.media_type}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } catch (e) {
    return (
      <div className={styles.result}>
        <span>Unexpected error, please try later</span>
      </div>
    );
  }
}
