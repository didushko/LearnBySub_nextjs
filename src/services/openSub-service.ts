import axios, { AxiosError, AxiosInstance } from "axios";
import OpensubError from "@/exceptions/opensubError";
import { IFeature } from "../interfaces/feature";

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

  async subtitlesQuery(query: ISubQuery) {
    let response = (
      await this.subAxios.get("/subtitles", {
        params: query,
      })
    ).data;
    return response;
  }

  async featuresQuery(query: IFeaturesQuery): Promise<{ data: IFeature[] }> {
    try {
      let response = (
        await this.subAxios.get("/features", {
          params: query,
        })
      ).data;
      return response;
    } catch (e: any | AxiosError) {
      console.error(e);
      if (e instanceof AxiosError) {
        throw new OpensubError(e.response?.status, e.message, e);
      }
      throw OpensubError.unexpectError(e.message);
    }
  }

  async getFeatureById(feature_id: number) {
    let result = await this.featuresQuery({ feature_id });
    if (result && result.data.length === 1) {
      return result.data[0];
    }
    return {};
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
      if (e instanceof AxiosError) {
        throw new OpensubError(e.response?.status, e.message, e);
      }
      throw OpensubError.unexpectError(e.message);
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
      if (e instanceof AxiosError) {
        throw new OpensubError(e.response?.status, e.message, e);
      }
      throw OpensubError.unexpectError(e.message);
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
      if (e instanceof AxiosError) {
        throw new OpensubError(e.response?.status, e.message, e);
      }
      throw OpensubError.unexpectError(e.message);
    }
  }

  async downloadSubs(fileId: number): Promise<string> {
    try {
      const res = await this.subAxios.post("/download", {
        file_id: fileId,
      });
      const subs = await axios.get(res.data.link);
      return subs.data.toString();
    } catch (e: any) {
      throw OpensubError.downloadError(e);
    }
  }
}

export default OpenSubService.getInstance();
