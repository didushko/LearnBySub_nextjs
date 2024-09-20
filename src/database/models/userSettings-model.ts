import mongoose, { Schema, model, Types, Document, Model } from "mongoose";

export interface IUserSettings {
  userId: Types.ObjectId;
  learningLanguages: string[];
  uiLanguage: string;
}

const UserSettingsSchema = new Schema<IUserSettings>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
