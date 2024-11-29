import { ISubStoreItem } from "@/database/models/subStore-model";
import subStoreService from "./subStore-service";
import dictService from "./dict-service";
import userSettingsService from "./userSettings-service";

class PlayService {
  async getPlayData(
    userId: string,
    mediaId: string,
    type: string
  ): Promise<ISubStoreItem | null> {
    try {
      const dict = await dictService.getDict(userId);
      const userSettings = await userSettingsService.get(userId);
      const storeItem = await subStoreService.get(mediaId, type, userSettings.learningLanguage);
      if (!storeItem) {
        return null;
      }

      storeItem.words = storeItem.words.filter((word) => {
        return dict.words?.some((dictWord) => {
          dictWord.value === word.value;
        });
      });
      storeItem.words = storeItem.words.sort((a, b) => a.freq - b.freq);
      storeItem.idioms = storeItem.idioms.filter((idiom) => {
        return dict.idioms?.some((dictIdiom) => {
          dictIdiom.value === idiom.value;
        });
      });
      storeItem.phrases = storeItem.phrases.filter((phrase) => {
        return dict.phrases?.some((dictPhrase) => {
          dictPhrase.value === phrase.value;
        });
      });
      return storeItem;
    } catch (error) {
      return null;
    }
  }
}

const playService = new PlayService();
export default playService;
