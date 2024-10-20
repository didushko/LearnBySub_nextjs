import libraryModel from "@/database/models/library-model";
import DatabaseConnection from "@/database/DatabaseConnetion";

class LibraryService extends DatabaseConnection {
  async getLibraryItemsById(
    userId: string,
    pagination: number = 1,
    itemsOnPage: number = 10
  ) {
    let library = await libraryModel.findOne({ user_id: userId });

    if (!library) {
      library = await libraryModel.create({ user_id: userId, list: [] });
      return {
        items: [],
        currentPage: 1,
        totalItems: 0,
        totalPages: 1,
      };
    }

    const totalPages = Math.ceil(library.list.length / itemsOnPage) || 1;

    const skip = (pagination - 1) * itemsOnPage;

    const paginatedList = library.list.slice(skip, skip + itemsOnPage);

    return {
      items: paginatedList,
      currentPage: pagination,
      totalItems: library.list.length,
      totalPages,
    };
  }

  async addToLibrary(userId: string, itemId: string, type: string) {
    try {
      const updatedLibrary = await libraryModel.findOneAndUpdate(
        { user_id: userId },
        { $push: { list: { id: itemId, type: type } } },
        { new: true, upsert: true }
      );
      return updatedLibrary.toObject();
    } catch (error) {
      console.error("Error adding item to library:", error);
      return undefined;
    }
  }

  async deleteFromLibrary(userId: string, itemId: string, type: string) {
    try {
      const updatedLibrary = await libraryModel.findOneAndUpdate(
        { user_id: userId },
        { $pull: { list: { id: itemId, type: type } } },
        { new: true }
      );
      return updatedLibrary;
    } catch (error) {
      console.error("Error deleting from library:", error);
      return false;
    }
  }

  private async _updateFavoriteStatus(
    userId: string,
    itemId: string,
    type: string,
    isFavorite: boolean
  ) {
    try {
      const result = await libraryModel.updateOne(
        { user_id: userId, "list.id": itemId, "list.type": type },
        {
          $set: { "list.$[elem].favorite": isFavorite },
        },
        {
          arrayFilters: [{ "elem.id": itemId, "elem.type": type }],
        }
      );

      if (!result.matchedCount) {
        if (isFavorite) {
          await libraryModel.findOneAndUpdate(
            { user_id: userId },
            {
              $push: {
                list: { id: itemId, type: type, favorite: isFavorite },
              },
            },
            { new: true, upsert: true }
          );
        }
      }
      return true;
    } catch (error) {
      console.error("Error updating favorite status:", error);
      return false;
    }
  }

  async addToFavorite(userId: string, itemId: string, type: string) {
    return this._updateFavoriteStatus(userId, itemId, type, true);
  }

  async deleteFromFavorite(userId: string, itemId: string, type: string) {
    return this._updateFavoriteStatus(userId, itemId, type, false);
  }

  async isInLibrary(
    userId: string,
    itemId: string,
    type: string,
    favorite?: boolean
  ): Promise<boolean> {
    try {
      const favoriteField = favorite ? { favorite: true } : {};
      const library = await libraryModel.exists({
        user_id: userId,
        list: {
          $elemMatch: { ...{ id: itemId, type: type }, ...favoriteField },
        },
      });
      if (library) {
        return !!library;
      }
      return false;
    } catch (error) {
      console.error("Error checking if item is in library:", error);
      return false;
    }
  }
}

const libraryService = new LibraryService();
export default libraryService;
