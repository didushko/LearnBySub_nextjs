import UserSettingsModel, {
  IUserSettings,
} from "@/database/models/userSettings-model";

import ApiError from "../exceptions/apiError";
import userModel from "@/database/models/user-model";

import connectToDatabase from "@/database/dbConnect";

class UserSettingsService {
  async get(userId: string) {
    try {
      connectToDatabase();
      let found = await UserSettingsModel.findOne({ userId });
      if (!found) {
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
          throw ApiError.badRequest(`User with userId ${userId} don't found`);
        }
        user.save();
        found = await UserSettingsModel.findOne({ userId });
      }
      return found!.toObject();
    } catch {
      throw ApiError.badRequest(`Settings with userId ${userId} don't found`);
    }
  }

  async update(
    userId: string,
    needUpdate: Partial<IUserSettings>
  ): Promise<IUserSettings> {
    try {
      connectToDatabase();
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
