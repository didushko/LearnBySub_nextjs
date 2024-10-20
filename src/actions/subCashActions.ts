"use server";

import LexyService from "@/services/lexy-service";
import openSubService from "@/services/openSub-service";
import subCashService from "@/services/subCash-service";
import { revalidatePath } from "next/cache";

export async function addToCash(
  itemId: string,
  type: "movie" | "tv",
  originalName: string,
  season: string | undefined,
  episode: string | undefined,
  path?: string
) {
  const id = season && episode ? itemId + "s" + season + "e" + episode : itemId;
  let cash = await subCashService.get(id, type);
  if (!cash) {
    const sub = await openSubService.getSubText(
      itemId,
      type,
      originalName,
      season,
      episode
    );
    const scanned = await LexyService.getAnalyzedResults(sub);
    cash = await subCashService.add({
      ...scanned,
      ...{ mediaId: id, type: type },
    });
  }
  if (path) {
    revalidatePath(path);
  }
}
