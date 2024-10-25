export interface IFeature {
  id: string;
  type: "feature";
  attributes:
    | (ITvshowAttributes & { feature_type: "Tvshow" })
    | (IEpisodeAttributes & { feature_type: "Episode" })
    | (IMovieAttributes & { feature_type: "Movie" });
}

export interface IMovie {
  id: string;
  type: "movie";
  attributes: IMovieAttributes;
}

export interface ITvshow {
  id: string;
  type: "tvshow";
  attributes: ITvshowAttributes;
}

export interface IEpisode {
  id: string;
  type: "episode";
  attributes: IEpisodeAttributes;
}

interface ITvshowAttributes {
  title: string;
  original_name: string;
  year: string;
  imdb_id: number;
  tmdb_id: number;
  title_aka: string[];
  feature_id: string;
  url: string;
  img_url: string;
  subtitles_counts: SubtitlesCounts;
  subtitles_count: number;
  seasons: Season[];
  parent_tmdb_id?: number;
}

interface IEpisodeAttributes {
  title: string;
  original_title: string | null;
  year: string;
  parent_tmdb_id: number;
  parent_title: string;
  season_number: number;
  episode_number: number;
  imdb_id: number;
  tmdb_id: number;
  feature_id: string;
  url: string;
  img_url: string;
  subtitles_counts: SubtitlesCounts;
  subtitles_count: number;
}

interface IMovieAttributes {
  title: string;
  original_title: string;
  year: string;
  subtitles_counts: SubtitlesCounts;
  parent_title: string;
  imdb_id: number;
  tmdb_id: number;
  parent_imdb_id: number;
  feature_id: string;
  title_aka: string[];
  url: string;
  img_url: string;
  parent_tmdb_id?: number;
}

interface SubtitlesCounts {
  [key: string]: number;
}

export interface Season {
  season_number: number;
  episodes: {
    episode_number: number;
    title: String;
    feature_id: number;
    feature_imdb_id: number;
  }[];
}
