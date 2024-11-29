"use server";

import LexyService from "@/services/lexy-service";
import openSubService from "@/services/openSub-service";
import subStoreService from "@/services/subStore-service";
import { revalidatePath } from "next/cache";

export async function addToStore(
  itemId: string,
  type: "movie" | "tv",
  lang: string,
  originalName: string,
  season: string | undefined,
  episode: string | undefined,
  path?: string
) {
  const id = season && episode ? itemId + "s" + season + "e" + episode : itemId;
  let storeItem = await subStoreService.get(id, type, lang);
  if (!storeItem) {
    const sub = await openSubService.getSubText(
      itemId,
      type,
      originalName,
      season,
      episode
    );
    const scanned = await LexyService.getAnalyzedResults(sub);
    storeItem = await subStoreService.add({
      ...scanned,
      ...{ mediaId: id, type, lang },
    });
  }
  if (path) {
    revalidatePath(path);
  }
}
