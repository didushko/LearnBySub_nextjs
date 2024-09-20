import mongoose, { Schema, model, Types, Document, Model } from "mongoose";
import { IRole } from "./role-model";
import UserSettingsModel from "./userSettings-model";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roles: Types.ObjectId[] | IRole[];
  activationLink?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  activationLink: { type: String },
});

UserSchema.pre<IUser>("save", async function (next) {
  try {
    const existingSettings = await UserSettingsModel.findOne({
      userId: this._id,
    });
    if (!existingSettings) {
      await UserSettingsModel.create({
        userId: this._id,
      });
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const User: Model<IUser> =
  mongoose?.models?.User || model<IUser>("User", UserSchema);
export default User;
