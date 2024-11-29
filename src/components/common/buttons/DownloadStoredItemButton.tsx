"use client";

import { addToStore } from "@/actions/subStoreActions";
import { useState } from "react";
import toast from "react-hot-toast";
import downloadIcon from "../../../../public/download-icon.svg";
import styles from "./Button.module.css";
import Image from "next/image";
import { DownloadStoredItemButtonDisabled } from "./DownloadStoredItemButtonDisabled";

export function DownloadStoredItemButton({
  id,
  type,
  lang,
  originalName,
  inStore,
  seasonNumber,
  episodeNumber,
  path,
}: {
  id: number;
  type: "tv" | "movie";
  lang: string;
  originalName: string;
  inStore: boolean;
  seasonNumber?: string | number;
  episodeNumber?: string | number;
  path?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const notify = (message: string) => toast.error(message.toString());
  const handler = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    try {
      await addToStore(
        id.toString(),
        type,
        lang,
        originalName,
        seasonNumber?.toString(),
        episodeNumber?.toString(),
        path
      );
    } catch (e: any) {
      notify(e.message);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <DownloadStoredItemButtonDisabled isLoading={true} />;
  }
  if (inStore) {
    return;
  } else
    return (
      <div
        className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        onClick={handler}
      >
        <Image
          width={50}
          height={50}
          src={downloadIcon}
          alt={"Download stats"}
        />
      </div>
    );
}
