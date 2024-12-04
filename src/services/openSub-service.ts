import axios, { AxiosError, AxiosInstance } from "axios";
import OpensubError from "@/exceptions/opensubError";
import { ITvshow, Season } from "../interfaces/feature";
import ISubtitle from "@/interfaces/subtitle";

export interface ISubQuery {
  query: string;
  page: number;
  type: "movie" | "episode" | "all";
  year?: number;
  season_number?: number;
  episode_number?: number;
  ai_translated: "exclude" | "include";
  machine_translated: "exclude" | "include";
  languages?: string;
  order_by?: string;
  order_direction?: "asc" | "desc";
  parent_feature_id?: number;
}

export interface IFeaturesQuery {
  query?: string;
  feature_id?: number;
  imdb_id?: string;
  type?: "movie" | "tvshow" | "episode";
  tmdb_id?: string;
  year?: number;
}

interface IDiscover {
  languages?: string;
  type?: "movie" | "tvshow";
}

class OpenSubService {
  private static instance: OpenSubService;
  private subAxios: AxiosInstance;
  private constructor() {
    this.subAxios = axios.create({
      baseURL: "https://api.opensubtitles.com/api/v1",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "API-KEY": process.env.OPENSUBTOKEN,
        "User-Agent": "LearnSub 1.0",
      },
    });
  }
  static getInstance(): OpenSubService {
    if (!OpenSubService.instance) {
      OpenSubService.instance = new OpenSubService();
    }
    return OpenSubService.instance;
  }

  async getSub(
    tmdbId: string,
    type: "Episode" | "Movie",
    originalName: string,
    selectedSeason: string | undefined,
    selectedEpisode: string | undefined
  ) {
    try {
      const findedFeature = await this.getFeatureByTmdbId(tmdbId, originalName);
      if (!findedFeature) {
        throw OpensubError.NoSubsFined();
      }
      let subtitles: { data: ISubtitle[] } = (
        await this.subAxios.get("/subtitles", {
          params: {
            [type === "Movie" ? "id" : "parent_feature_id"]:
              findedFeature.attributes?.feature_id,
            type,
            ai_translated: "exclude",
            languages: "en",
            foreign_parts_only: "exclude",
            hearing_impaired: "exclude",
            trusted_sources: true,
            season_number: selectedSeason,
            episode_number: selectedEpisode,
          },
        })
      ).data;
      if (subtitles.data.length > 0) {
        return subtitles.data[0];
      } else {
        throw OpensubError.NoSubsFined();
      }
    } catch (e) {
      console.log("Error when get sub", e);
      throw OpensubError.NoSubsFined();
    }
  }

  async getFeatureByTmdbId(tmdb_id: number | string, originalName: string) {
    try {
      let result: ITvshow[] = (
        await this.subAxios.get("/features", {
          params: { tmdb_id: tmdb_id.toString() },
        })
      ).data.data;
      if (result && result.length > 0) {
        let finded = result.find(
          (el) =>
            el.attributes.original_name?.toLowerCase() ===
              originalName.toLowerCase() ||
            el.attributes.original_title?.toLowerCase() ===
              originalName.toLowerCase() ||
            el.attributes.title?.toLowerCase() === originalName.toLowerCase()
        );
        if (finded) {
          return finded;
        }
      }
    } catch (e: any | AxiosError) {
      throw OpensubError.unexpectError(e);
    }
  }

  async getSeasons(
    tmdb_id: number,
    originalName: string
  ): Promise<Season[] | undefined> {
    const finded = await this.getFeatureByTmdbId(tmdb_id, originalName);
    if (finded) {
      const filtered = finded.attributes.seasons?.filter(
        (s) => s.episodes.length > 0
      );
      if (filtered?.length > 0) return filtered;
    }
    return undefined;
  }

  async discoverPopular(query?: IDiscover) {
    try {
      let response = (
        await this.subAxios.get("/discover/popular", {
          params: query,
        })
      ).data;

      return response;
    } catch (e: any | AxiosError) {
      throw OpensubError.unexpectError(e);
    }
  }

  async discoverLatest(query?: IDiscover) {
    try {
      let response = (
        await this.subAxios.get("/discover/latest", {
          params: query,
        })
      ).data;
      return response;
    } catch (e: any | AxiosError) {
      throw OpensubError.unexpectError(e);
    }
  }

  async discoverMostDownloaded(query?: IDiscover) {
    try {
      let response = (
        await this.subAxios.get("/discover/most_downloaded", {
          params: query,
        })
      ).data;
      return response;
    } catch (e: any | AxiosError) {
      throw OpensubError.unexpectError(e);
    }
  }

  async download(fileId: number): Promise<string> {
    try {
      const res = await this.subAxios.post("/download", {
        file_id: fileId,
      });
      if (res.data.remaining === 0) {
        throw OpensubError.NoRemaining(res.data.reset_time);
      }
      const sub = await axios.get(res.data.link, {
        headers: {
          Accept: "text/plain",
          "User-Agent": "LearnSub 1.0",
        },
      });
      return sub.data;
    } catch (e: any) {
      throw OpensubError.downloadError(e);
    }
  }

  async getSubText(
    tmdbId: string,
    type: "tv" | "movie",
    originalName: string,
    season: string | undefined,
    episode: string | undefined
  ) {
    const sub = await this.getSub(
      tmdbId,
      type === "movie" ? "Movie" : "Episode",
      originalName,
      season,
      episode
    );
    if (!sub || sub.attributes.files?.length < 1) {
      throw OpensubError.NoSubsFined();
    }
    const fileId = sub.attributes.files[0].file_id;
    const subText = await this.download(fileId);
    return subText;
  }
}

export default OpenSubService.getInstance();
