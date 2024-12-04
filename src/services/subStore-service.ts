import { SUB_STORE_MAX_ITEM } from "@/constants";
import DatabaseConnection from "@/database/DatabaseConnetion";
import SubStoreModel, {
  IIdiom,
  IPhrase,
  ISubStoreItem,
  IWord,
} from "@/database/models/subStore-model";
import userSettingsService from "./userSettings-service";

export interface ISubStoreWithRate {
  mediaId: string;
  type: string;
  words: IWordWithRate[];
  idioms: IIdiomWithRate[];
  phrases: IPhraseWithRate[];
  excludedItemsCount: {
    words: number;
    idioms: number;
    phrases: number;
  };
}

export interface IWordWithRate extends IWord {
  rate: number;
}
export interface IIdiomWithRate extends IIdiom {
  rate: number;
}
export interface IPhraseWithRate extends IPhrase {
  rate: number;
}

class SubStoreService extends DatabaseConnection {
  async add(newSubItem: ISubStoreItem) {
    try {
      const existingItem = await SubStoreModel.findOne({
        mediaId: newSubItem.mediaId,
        type: newSubItem.type,
        lang: newSubItem.lang,
      });
      if (existingItem) {
        return existingItem.toObject();
      }
      const totalCount = await SubStoreModel.countDocuments();

      if (totalCount >= SUB_STORE_MAX_ITEM) {
        await SubStoreModel.findOneAndDelete({}, { sort: { createdAt: 1 } });
      }

      const newEntry = new SubStoreModel(newSubItem);
      await newEntry.save();
      return newEntry.toObject();
    } catch (error) {
      console.error("Error adding item to the SubStore:", error);
      return null;
    }
  }

  async get(
    mediaId: string,
    type: string,
    lang: string
  ): Promise<ISubStoreItem | null> {
    try {
      const item = await SubStoreModel.findOne({ mediaId, type, lang });
      if (item) {
        return item.toObject();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching item by mediaId:", error);
      return null;
    }
  }

  async getFilteredItem(
    userId: string,
    mediaId: string,
    type: string
  ): Promise<ISubStoreWithRate | null> {
    try {
      const userSettings = await userSettingsService.get(userId);
      const filteredSubItems: ISubStoreWithRate[] =
        await SubStoreModel.aggregate([
          { $match: { mediaId, type, lang: userSettings.learningLanguage } },
          {
            $lookup: {
              from: "dicts",
              let: { userId: "$user_id" },
              pipeline: [{ $match: { $expr: { $eq: ["$user_id", userId] } } }],
              as: "userDict",
            },
          },
          {
            $unwind: {
              path: "$userDict",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              mediaId: 1,
              type: 1,
              originalWords: "$words",
              originalIdioms: "$idioms",
              originalPhrases: "$phrases",
              words: getAggregatedField("words"),
              idioms: getAggregatedField("idioms"),
              phrases: getAggregatedField("phrases"),
            },
          },
          {
            $addFields: {
              excludedItemsCount: {
                words: {
                  $subtract: [{ $size: "$originalWords" }, { $size: "$words" }],
                },
                idioms: {
                  $subtract: [
                    { $size: "$originalIdioms" },
                    { $size: "$idioms" },
                  ],
                },
                phrases: {
                  $subtract: [
                    { $size: "$originalPhrases" },
                    { $size: "$phrases" },
                  ],
                },
              },
            },
          },
          {
            $project: {
              originalWords: 0,
              originalIdioms: 0,
              originalPhrases: 0,
            },
          },
          {
            $unset: [
              "_id",
              "__v",
              "user_id",
              "words._id",
              "idioms._id",
              "phrases._id",
            ],
          },
        ]);
      return filteredSubItems.length > 0 ? filteredSubItems[0] : null;
    } catch (error) {
      console.error("Error fetching filtered subStore", error);
      return null;
    }
  }
}

const subStoreService = new SubStoreService();
export default subStoreService;

const getAggregatedField = (field: string) => {
  const baseField = {
    $filter: {
      input: {
        $map: {
          input: `$${field}`,
          as: "fieldItem",
          in: {
            $mergeObjects: [
              "$$fieldItem",
              {
                rate: {
                  $let: {
                    vars: {
                      dictItem: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: `$userDict.${field}`,
                              as: "dictItem",
                              cond: {
                                $eq: [`$$dictItem.value`, `$$fieldItem.value`],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: { $ifNull: [`$$dictItem.rate`, 0] },
                  },
                },
              },
            ],
          },
        },
      },
      as: "mergedItem",
      cond: { $lt: ["$$mergedItem.rate", 10] }, // Filter items where rate < 10
    },
  };
  if (field === "words") {
    return {
      $sortArray: {
        input: baseField,
        sortBy: { freq: 1 },
      },
    };
  }

  return baseField;
};
