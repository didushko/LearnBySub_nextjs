import UserDto from "@/interfaces/user-dto";
import dictModel from "@/database/models/dict-model";
import { ObjectId, Types } from "mongoose";
import openSubService from "./openSub-service";
import DatabaseConnection from "@/database/DatabaseConnetion";

class DictService extends DatabaseConnection {
  async getDict(user: UserDto) {
    let dict = await dictModel.findOne({ user: user.id });
    if (!dict) {
      dict = await dictModel.create({ user: user.id, words: [] });
    }
    return dict.toObject();
  }
}

const Dict = new DictService()

export default Dict;
