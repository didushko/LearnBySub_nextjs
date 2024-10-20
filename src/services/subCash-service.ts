import { CASH_MAX_ITEM } from "@/constants";
import DatabaseConnection from "@/database/DatabaseConnetion";
import SubCashModel, { ISubCash } from "@/database/models/subCash-model";

class SubCashService extends DatabaseConnection {
  async add(newSubCash: ISubCash) {
    try {
      const existingItem = await SubCashModel.findOne({
        mediaId: newSubCash.mediaId,
      });
      if (existingItem) {
        return existingItem.toObject();
      }
      const totalCount = await SubCashModel.countDocuments();

      if (totalCount >= CASH_MAX_ITEM) {
        await SubCashModel.findOneAndDelete({}, { sort: { createdAt: 1 } });
      }

      const newEntry = new SubCashModel(newSubCash);
      await newEntry.save();
      return newEntry.toObject();
    } catch (error) {
      console.error("Error adding item to the cash:", error);
      return null;
    }
  }

  async get(mediaId: string, type: string): Promise<ISubCash | null> {
    try {
      const item = await SubCashModel.findOne({ mediaId, type });
      if (item) {
        return item.toObject();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching item by mediaId:", error);
      return null;
    }
  }
}

const subCashService = new SubCashService();
export default subCashService;
