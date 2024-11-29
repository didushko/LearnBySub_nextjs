import dictModel from "@/database/models/dict-model";
import DatabaseConnection from "@/database/DatabaseConnetion";
import axios from "axios";
import {
  IIdiom,
  IPhrase,
  ISubStoreItem,
  IWord,
} from "@/database/models/subStore-model";

class DictService extends DatabaseConnection {
  async getDict(userId: string) {
    let dict = await dictModel.findOne({ user_id: userId });
    if (!dict) {
      dict = await dictModel.create({ user_id: userId, words: [] });
    }
    return dict.toObject();
  }

  async updateElement(
    userId: string,
    type: "words" | "idioms" | "phrases",
    value: string,
    rate: number
  ) {
    try {
      const dictExists = await dictModel.exists({ user_id: userId });
      if (!dictExists) {
        await dictModel.create({
          user_id: userId,
          [type]: [{ value, rate }],
        });
        return true;
      }

      const elementExists = await dictModel.findOne(
        { user_id: userId, [`${type}.value`]: value },
        { [`${type}.$`]: 1 }
      );

      if (elementExists && elementExists[type]?.[0]?.rate === rate) {
        return true;
      }

      if (elementExists) {
        const updateResult = await dictModel.updateOne(
          { user_id: userId, [`${type}.value`]: value },
          {
            $set: {
              [`${type}.$.rate`]: rate,
            },
          }
        );
        if (updateResult.modifiedCount === 0) {
          return false;
        }
        return true;
      }
      const pushResult = await dictModel.updateOne(
        { user_id: userId },
        {
          $push: {
            [`${type}`]: { value, rate },
          },
        }
      );
      if (pushResult.modifiedCount === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error updating element:", error);
      return false;
    }
  }
}
const dictService = new DictService();

export default dictService;
