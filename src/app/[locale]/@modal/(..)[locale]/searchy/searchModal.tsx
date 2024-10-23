"use client";
import { ReactElement } from "react";
import styles from "./style.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { getCleanPathname } from "@/../i18nConfig";
import Modal from "@/components/common/Modal";

export default function SearchModal({ children }: { children: ReactElement }) {
  const pathName = usePathname();
  const { back, replace } = useRouter();
  const searchParams = useSearchParams();

  if (getCleanPathname(pathName) !== "/searchy") {
    return null;
  }

  const closeHandler = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`${pathName}?${params.toString()}`);
    back();
  };
  return (
    <Modal
      visible={true}
      backdropeStyleClass={styles.BackDropWraper}
      addIdToFocus={["header"]}
      dropCallback={closeHandler}
      onKeyUp={(e) => {
        if (e.key == "Escape") {
          closeHandler();
        }
      }}
    >
      {children}
    </Modal>
  );
}
