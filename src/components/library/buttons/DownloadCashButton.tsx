"use client";

import { addToCash } from "@/actions/subCashActions";
import { useState } from "react";
import toast from "react-hot-toast";
import downloadIcon from "../../../../public/download-icon.svg";
import styles from "./Button.module.css";
import Image from "next/image";
import { DownloadCashButtonDisabled } from "./DownloadCashButtonDisabled";

export function DownloadCashButton({
  id,
  type,
  originalName,
  inCash,
  seasonNumber,
  episodeNumber,
  path,
}: {
  id: number;
  type: "tv" | "movie";
  originalName: string;
  inCash: boolean;
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
      await addToCash(
        id.toString(),
        type,
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
    return <DownloadCashButtonDisabled isLoading={true} />;
  }
  if (inCash) {
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
