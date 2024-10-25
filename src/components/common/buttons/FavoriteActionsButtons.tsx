"use client";
import React, { useState, useEffect } from "react";
import styles from "./Button.module.css";
import Image from "next/image";
import { addToFavorite, deleteFromFavorite } from "@/actions/libraryActions";
import toast from "react-hot-toast";
import AddedIcon from "../../../../public/added-to-favorites-icon.svg";
import AddIcon from "../../../../public/add-to-favorites-icon.svg";

const FavoriteButton = ({
  userId,
  itemId,
  type,
  inFavorite,
  path,
  size = 50,
}: {
  userId: string;
  itemId: string;
  type: string;
  inFavorite: boolean;
  path?: string;
  size?: number;
}) => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [inFavorite]);

  const handleAddToFavorite = async function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const added = await addToFavorite(userId, itemId, type, path);
    if (!added) {
      toast.error("Error when adding to favorite");
      setLoading(false);
    }
  };

  const handleDeleteFromFavorite = async function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const deleted = await deleteFromFavorite(userId, itemId, type, path);
    if (!deleted) {
      toast.error("Error when deleting to favorite");
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.button} ${isLoading ? styles.loading : ""}`}
      onClick={inFavorite ? handleDeleteFromFavorite : handleAddToFavorite}
      tabIndex={0}
    >
      {inFavorite ? (
        <Image
          width={size}
          height={size}
          src={AddedIcon}
          alt={"Delete from favorite icon"}
        />
      ) : (
        <Image
          width={size}
          height={size}
          src={AddIcon}
          alt={"Add to favorite icon"}
        />
      )}
    </div>
  );
};

export default FavoriteButton;
