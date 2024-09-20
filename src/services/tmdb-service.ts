import axios, { AxiosError, AxiosInstance } from "axios";
import TmdbError from "@/exceptions/tmdbError";
import {
  IDiscover,
  IApiResponse,
  IDetailsMovie,
  IDetailsTv,
  SearchResultsType,
  IMovie,
  ITv,
} from "@/interfaces/media";

class TMDBService {
  private static instance: TMDBService;
  private subAxios: AxiosInstance;
  private constructor() {
    this.subAxios = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    });
  }
  static getInstance(): TMDBService {
    if (!TMDBService.instance) {
      TMDBService.instance = new TMDBService();
    }
    return TMDBService.instance;
  }

  async getDiscoverList(query: IDiscover): Promise<IApiResponse<IMovie | ITv>> {
    try {
      const { type, discover, page, language, region } = query;
      const res = await this.subAxios.get(`/${type}/${discover}`, {
        params: {
          page,
          language,
          region,
        },
      });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw TmdbError.unexpectError(e.message);
      }

      throw TmdbError.unexpectError();
    }
  }

  async getTrends(
    type: "movie" | "tv",
    period: "day" | "week",
    page?: number,
    language?: string
  ): Promise<IApiResponse<IMovie | ITv>> {
    try {
      const res = await this.subAxios.get(`/trending/${type}/${period}`, {
        params: {
          page,
          language,
        },
      });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw TmdbError.unexpectError(e.message);
      }

      throw TmdbError.unexpectError();
    }
  }

  async getMovieDetails(id: number, language?: string): Promise<IDetailsMovie> {
    try {
      const res = await this.subAxios.get(`/movie/${id}`, {
        params: {
          language,
        },
      });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw TmdbError.unexpectError(e.message);
      }

      throw TmdbError.unexpectError();
    }
  }

  async getTvDetails(id: number, language?: string): Promise<IDetailsTv> {
    try {
      const res = await this.subAxios.get(`/tv/${id}`, {
        params: {
          language,
        },
      });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw TmdbError.unexpectError(e.message);
      }

      throw TmdbError.unexpectError();
    }
  }

  async search(params: {
    query: string;
    adult: boolean;
    language: string;
    page: number;
  }): Promise<IApiResponse<SearchResultsType>> {
    try {
      const res = await this.subAxios.get(`/search/multi`, {
        params,
      });
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw TmdbError.unexpectError(e.message);
      }

      throw TmdbError.unexpectError();
    }
  }

  async discoverRequest(
    type: "movie" | "tv",
    discover: "popular" | "top_rated" | "trend_day" | "trend_week",
    language: string,
    region?: string,
    page?: number
  ) {
    if (discover === "popular" || discover === "top_rated") {
      return this.getDiscoverList({ type, discover, language, region, page });
    } else {
      let period: "day" | "week" = discover === "trend_day" ? "day" : "week";
      return this.getTrends(type, period, page, language);
    }
  }

  getDetails(type: "tv" | "movie", id: number, language: string) {
    if (type == "movie") {
      return this.getMovieDetails(id, language);
    } else {
      return this.getTvDetails(id, language);
    }
  }

  getUnitMediaFields(media: IDetailsTv | IDetailsMovie | ITv | IMovie): {
    title: string;
    year?: number;
    originalTitle: string;
    runtime?: number;
  } {
    if (Object.hasOwn(media, "name")) {
      let tvmedia = media as unknown as IDetailsTv;
      const title = tvmedia.name;
      const year = tvmedia.first_air_date
        ? new Date(tvmedia.first_air_date).getFullYear()
        : undefined;
      const originalTitle = tvmedia.original_name;
      const runtime = tvmedia.episode_run_time?.[0] || undefined;
      return { title, year, originalTitle, runtime };
    } else {
      media = media as IDetailsMovie;
      const title = media.title;
      const year = media.release_date
        ? new Date(media.release_date).getFullYear()
        : undefined;
      const originalTitle = media.original_title;
      const runtime = media.runtime;
      return { title, year, originalTitle, runtime };
    }
  }
}

export default TMDBService.getInstance();
