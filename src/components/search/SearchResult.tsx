import React, { Suspense } from "react";
import tmdbService from "@/services/tmdb-service";
import styles from "./SearchResult.module.css";
import PosterImg from "@/components/media/PosterImg";
import TruncatedText from "@/components/common/TruncatedText";
import initTranslations from "@/commons/i18n";
import SearchResultLoader from "./loaders/SearchResultLoader";
import ResponsiveNavigation from "../common/ResponsiveNavigation";

interface ISearchResultProps {
  query: string;
  searchParams?: { [key: string]: string | undefined };
  locale: string;
}

async function SearchResult({
  query,
  locale,
  searchParams,
}: ISearchResultProps) {
  const { t } = await initTranslations(locale, ["media"]);
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
        searchParams,
        adult: false,
        language: locale,
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
        {data.map((media, i) => {
          let { title, year } = tmdbService.getUnitMediaFields(media);
          return (
            <ResponsiveNavigation
              key={media.id}
              mode="border"
              path={`/media/${media.media_type}/${media.id}`}
              className={styles.resultContainer}
            >
              {/* <div className={styles.resultContainer}> */}
              <div className={styles.imageContainer}>
                <PosterImg
                  sizes="70px"
                  posterPath={media.poster_path}
                  title={title}
                  priority={i < 2}
                />
              </div>
              <div>
                <div className={styles.text}>
                  <TruncatedText position="bottom">{title}</TruncatedText>
                </div>
                <div className={styles.text}>{year || ""}</div>
                <div className={styles.text}>{t(media.media_type)}</div>
              </div>
              {/* </div> */}
            </ResponsiveNavigation>
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

const SearchResultWithSuspense = async (args: ISearchResultProps) => (
  <Suspense
    key={
      "searchResult" + args.query + args.locale + args.searchParams?.toString()
    }
    fallback={<SearchResultLoader />}
  >
    <SearchResult {...args} />
  </Suspense>
);

export default SearchResultWithSuspense;
