import mongoose, { Schema, model, Types, Model } from "mongoose";

export interface IToken {
  user: Types.ObjectId;
  refreshToken: string;
}

const TockenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});
const Token: Model<IToken> =
  mongoose?.models?.Token || model("Token", TockenSchema);
export default Token;
