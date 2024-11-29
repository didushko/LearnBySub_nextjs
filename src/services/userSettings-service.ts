import UserSettingsModel, {
  IUserSettings,
} from "@/database/models/userSettings-model";

import ApiError from "../exceptions/apiError";
import userModel from "@/database/models/user-model";
import DatabaseConnection from "@/database/DatabaseConnetion";
import { use } from "react";

class UserSettingsService extends DatabaseConnection {
  async get(userId: string) {
    try {
      let found = await UserSettingsModel.findOne({ user_id: userId });
      if (!found) {
        const userSettings = await UserSettingsModel.create({
          user_id: userId,
        });
        return userSettings.toObject();
      }
      return found!.toObject();
    } catch (e) {
      console.log(e);
      throw ApiError.badRequest(`Settings with userId ${userId} don't found`);
    }
  }

  async update(
    userId: string,
    needUpdate: Partial<IUserSettings>
  ): Promise<IUserSettings> {
    try {
      const updatedSettings = await UserSettingsModel.findOneAndUpdate(
        { userId: userId },
        needUpdate,
        { new: true }
      );
      if (!updatedSettings) {
        throw ApiError.badRequest(
          `Error when try update settings for  user with id${userId}`
        );
      }
      return updatedSettings.toObject();
    } catch (e: any) {
      if (e.name == "Validation error:") {
        throw ApiError.badRequest("Error validating needUpdate field", [e]);
      }
      throw ApiError.badRequest(
        `Error when try update settings for  user with id${userId}`
      );
    }
  }
}

const userSettingsService = new UserSettingsService();

export default userSettingsService;
