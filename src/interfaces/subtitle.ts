export default interface ISubtitle {
  id: string;
  type: "subtitle";
  attributes: Attributes;
}

interface Uploader {
  uploader_id: number | null;
  name: string;
  rank: string;
}

interface FeatureDetails {
  feature_id: number;
  feature_type: string;
  year: number;
  parent_title?: string;
  title: string;
  movie_name: string;
  imdb_id: number;
  tmdb_id?: number;
  season_number: number;
  episode_number: number;
  parent_tmdb_id?: number;
}
interface FeatureDetailsMovie {
  feature_id: number;
  feature_type: "Movie";
  year: number;
  title: string;
  movie_name: string;
  imdb_id: number;
  tmdb_id: number;
}

interface File {
  file_id: number;
  cd_number: number;
  file_name: string;
}

interface RelatedLink {
  label: string;
  url: string;
  img_url: string;
}

interface Attributes {
  subtitle_id: string;
  language: string;
  download_count: number;
  new_download_count: number;
  hearing_impaired: boolean;
  hd: boolean;
  fps: number;
  votes: number;
  points?: number;
  ratings: number;
  from_trusted: boolean;
  foreign_parts_only: boolean;
  ai_translated: boolean;
  machine_translated: boolean;
  upload_date: string;
  release: string;
  comments: string;
  legacy_subtitle_id: number;
  uploader: Uploader;
  feature_details: FeatureDetails & FeatureDetailsMovie;
  url: string;
  related_links: RelatedLink[];
  files: File[];
}
