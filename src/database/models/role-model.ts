import mongoose, { Model, Schema, Types, model } from "mongoose";

export interface IRole {
  _id: Types.ObjectId;
  value: string;
}

const RoleSchema = new Schema<IRole>({
  value: { type: String, unique: true, default: "UNACTIVATED" },
});

const Role: Model<IRole> =
  mongoose?.models?.Role || model<IRole>("Role", RoleSchema);

export default Role;
