import mongoose, { Schema, model, Model } from "mongoose";

export interface ILibrary {
  user_id: string;
  list: ILibraryItem[];
}

interface ILibraryItem {
  id: string;
  type: "tv" | "movie";
  favorite: boolean;
}

const LibrarySchema = new Schema<ILibrary>({
  user_id: { type: String, required: true },
  list: [
    {
      id: { type: String, require: true },
      type: { type: String, require: true, enum: ["tv", "movie"] },
      favorite: { type: Boolean, require: false, default: false },
    },
  ],
});

const Library: Model<ILibrary> =
  mongoose?.models?.Library || model("Library", LibrarySchema);

export default Library;
