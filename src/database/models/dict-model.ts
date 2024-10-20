import mongoose, { Schema, model, Types, Model } from "mongoose";

export interface IDict {
  user_id: String;
  words?: {
    value: string;
    rate: number;
  }[];
  idioms: {
    value: string;
    rate: number;
  }[];
  phrases: {
    value: string;
    rate: number;
  }[];
}

const DictSchema = new Schema<IDict>({
  user_id: { type: String, required: true },
  words: [
    {
      value: { type: String, require: true },
      rate: { type: Number, require: true, default: 0 },
    },
  ],
  idioms: [
    {
      value: { type: String, require: true },
    },
  ],
  phrases: [
    {
      value: { type: String, require: true },
    },
  ],
});

const Dict: Model<IDict> = mongoose?.models?.Dict || model("Dict", DictSchema);

export default Dict;
