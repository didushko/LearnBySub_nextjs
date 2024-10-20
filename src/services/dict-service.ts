import dictModel from "@/database/models/dict-model";
import DatabaseConnection from "@/database/DatabaseConnetion";
import axios from "axios";
import {
  IIdiom,
  IPhrase,
  ISubCash,
  IWord,
} from "@/database/models/subCash-model";

class DictService extends DatabaseConnection {
  async getDict(userId: string) {
    let dict = await dictModel.findOne({ user: userId });
    if (!dict) {
      dict = await dictModel.create({ user: userId, words: [] });
    }
    return dict.toObject();
  }

  async getStatisticsBySubData(userId: string, subData: ISubCash) {
    const matchData = await dictModel.aggregate([
      { $match: { user_id: userId } },
      {
        $project: {
          words: {
            $filter: {
              input: "$words",
              as: "word",
              cond: { $lt: ["$$word.rate", 10] },
            },
          },
          idioms: {
            $filter: {
              input: "$idioms",
              as: "idiom",
              cond: { $lt: ["$$idiom.rate", 10] },
            },
          },
          phrases: {
            $filter: {
              input: "$phrases",
              as: "phrase",
              cond: { $lt: ["$$phrase.rate", 10] },
            },
          },
        },
      },
    ]);

    if (matchData.length === 0) {
      return {
        words: 0,
        idioms: 0,
        phrases: 0,
      };
    }

    const matchedWords =
      subData.words?.filter((item) =>
        matchData[0].words.some(
          (dictItem: IWord) => dictItem.value === item.value
        )
      ).length || 0;
    const matchedIdioms =
      subData.idioms?.filter((item) =>
        matchData[0].idioms.some(
          (dictItem: IIdiom) => dictItem.value === item.value
        )
      ).length || 0;
    const matchedPhrases =
      subData.phrases?.filter((item) =>
        matchData[0].phrases.some(
          (dictItem: IPhrase) => dictItem.value === item.value
        )
      ).length || 0;

    return {
      words: matchedWords,
      idioms: matchedIdioms,
      phrases: matchedPhrases,
    };
  }
}

const Dict = new DictService();

export default Dict;
