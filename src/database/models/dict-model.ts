import mongoose, { Schema, model, Types, Model } from "mongoose";

export interface IDict {
  user: Types.ObjectId;
  words?: {
    value: string;
    rate: number;
  }[];
}

const TockenSchema = new Schema<IDict>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  words: [
    {
      value: { type: String, require: true },
      rate: { type: Number, require: true, default: 0 },
    },
  ],
});

const Dict: Model<IDict> =
  mongoose?.models?.Dict || model("Dict", TockenSchema);

export default Dict;
