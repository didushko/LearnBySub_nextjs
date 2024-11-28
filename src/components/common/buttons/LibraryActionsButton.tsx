"use client";
import React, { useState, useEffect } from "react";
import styles from "./Button.module.css";
import Image from "next/image";
import { addToLibrary, deleteFromLibrary } from "@/actions/libraryActions";
import toast from "react-hot-toast";
import addIcon from "../../../../public/add-to-library.svg";
import deleteIcon from "../../../../public/delete-from-library.svg";

const LibraryActionsButtons = ({
  userId,
  itemId,
  type,
  inLibrary,
  path,
  size = 50,
}: {
  userId: string;
  itemId: string;
  type: string;
  inLibrary: boolean;
  path?: string;
  size?: number;
}) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [inLibrary]);

  const handleAddToLibrary = async function (e: any) {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    const added = await addToLibrary(userId, itemId, type, path);
    if (!added) {
      toast.error("Error when adding to library");
      setLoading(false);
    }
  };

  const handleDeleteFromLibrary = async function (e: any) {
    e.stopPropagation();
    e.preventDefault();
    setLoading(true);
    const deleted = await deleteFromLibrary(userId, itemId, type, path);
    if (!deleted) {
      toast.error("Error when deleting to library");
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.button} ${isLoading ? styles.loading : ""}`}
      onClick={inLibrary ? handleDeleteFromLibrary : handleAddToLibrary}
      tabIndex={0}
    >
      {inLibrary ? (
        <Image
          width={size}
          height={size}
          src={deleteIcon}
          alt={"Delete from library icon"}
        />
      ) : (
        <Image
          width={size}
          height={size}
          src={addIcon}
          alt={"Add to library icon"}
        />
      )}
    </div>
  );
};

export default LibraryActionsButtons;
