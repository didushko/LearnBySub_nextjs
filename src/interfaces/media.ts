export interface IDetailsMovie extends IMediaDetailsCommon {
  original_title: string;
  release_date: string;
  runtime: number;
  title: string;
}

export interface IDetailsTv extends IMediaDetailsCommon {
  episode_run_time: number[];
  first_air_date: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  next_episode_to_air: string | null;
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  seasons: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  status: string;
  tagline: string;
  type: string;
}

export type SearchResultsType =
  | (IMovie & { media_type: "movie" })
  | (ITv & { media_type: "tv" });

export interface IMovie extends BaseFields {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface ITv extends BaseFields {
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface IApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface IDiscover {
  type: "movie" | "tv";
  discover: "popular" | "top_rated";
  language?: string;
  region?: string;
  page?: number;
}

interface IMediaDetailsCommon extends BaseFields {
  genres: {
    id: number;
    name: string;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
}

interface BaseFields {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
}
