import mongoose, { Schema, model, Model } from "mongoose";

export interface ISubCash {
  mediaId: string;
  type: string;
  words: IWord[];
  idioms: IIdiom[];
  phrases: IPhrase[];
}

export interface IWord {
  value: string;
  lemma: string;
  freq: number;
  type: "word";
}
export interface IIdiom {
  value: string;
  definitions: string;
  type: "idiom";
}
export interface IPhrase {
  value: string;
  definitions: string;
  type: "phrasal_verbs";
}

const SubCashSchema = new Schema<ISubCash>({
  mediaId: { type: String, required: true },
  type: { type: String, required: true },
  words: [
    {
      value: { type: String, required: true },
      lemma: { type: String, required: false },
      freq: { type: Number, required: true },
      type: { type: String, required: true, enum: ["word"] },
    },
  ],
  idioms: [
    {
      value: { type: String, required: true },
      definitions: { type: String, required: false },
      type: { type: String, required: true, enum: ["idiom"] },
    },
  ],
  phrases: [
    {
      value: { type: String, required: true },
      definitions: { type: String, required: false },
      type: { type: String, required: true, enum: ["phrasal_verbs"] },
    },
  ],
});

const SubCash: Model<ISubCash> =
  mongoose?.models?.SubCash || model("SubCash", SubCashSchema);

export default SubCash;
