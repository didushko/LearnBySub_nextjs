import mongoose, { Schema, model, Model } from "mongoose";

export interface IUserSettings {
  user_id: String;
  learningLanguages: string[];
  uiLanguage: string;
}

const UserSettingsSchema = new Schema<IUserSettings>({
  user_id: {
    type: String,
    unique: true,
    required: true,
  },
  learningLanguages: { type: [String], required: true, default: ["en"] },
  uiLanguage: { type: String, required: true, default: "en" },
});
const UserSettings: Model<IUserSettings> =
  mongoose?.models?.UserSettings ||
  model<IUserSettings>("UserSettings", UserSettingsSchema);
export default UserSettings;
