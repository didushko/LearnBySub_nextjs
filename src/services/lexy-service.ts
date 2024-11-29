import { IIdiom, IPhrase, IWord } from "@/database/models/subStore-model";
import LexyError from "@/exceptions/lexyError";
import axios, { AxiosInstance } from "axios";

class LexyService {
  private static instance: LexyService;
  private subAxios: AxiosInstance;
  private constructor() {
    this.subAxios = axios.create({
      baseURL: process.env.ANALYZEHOST,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Host: process.env.HOSTURL,
      },
    });
  }
  static getInstance(): LexyService {
    if (!LexyService.instance) {
      LexyService.instance = new LexyService();
    }
    return LexyService.instance;
  }

  async getAnalyzedResults(
    rawSubtitles: string
  ): Promise<{ words: IWord[]; phrases: IPhrase[]; idioms: IIdiom[] }> {
    try {
      let res = await this.subAxios.post("analyze/", {
        text: rawSubtitles,
      });
      return res.data;
    } catch (e: any) {
      console.log(e.message);
      throw LexyError.ErrorWhenAScan(e);
    }
  }
}

export default LexyService.getInstance();
