"use server";

import libraryService from "@/services/library-service";
import { revalidatePath } from "next/cache";

export async function addToLibrary(
  userId: string,
  itemId: string,
  type: string,
  path?: string
) {
  const added = await libraryService.addToLibrary(userId, itemId, type);
  if (path && added) {
    revalidatePath(path);
  }
  return !!added;
}

export async function deleteFromLibrary(
  userId: string,
  itemId: string,
  type: string,
  path?: string
) {
  const deleted = await libraryService.deleteFromLibrary(userId, itemId, type);
  if (path && deleted) {
    revalidatePath(path);
  }
  return !!deleted;
}

export async function addToFavorite(
  userId: string,
  itemId: string,
  type: string,
  path?: string
) {
  const added = await libraryService.addToFavorite(userId, itemId, type);
  if (path && added) {
    revalidatePath(path);
  }
  return !!added;
}

export async function deleteFromFavorite(
  userId: string,
  itemId: string,
  type: string,
  path?: string
) {
  const deleted = await libraryService.deleteFromFavorite(userId, itemId, type);
  if (path && deleted) {
    revalidatePath(path);
  }
  return !!deleted;
}

