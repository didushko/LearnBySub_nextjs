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
  
  return (
    <Modal
      visible={true}
      backdropeStyleClass={styles.BackDropWraper}
      addIdToFocus={["header"]}
      dropCallback={back}
      onKeyUp={(e) => {
        if (e.key == "Escape") {
          back();
        }
      }}
    >
      {children}
    </Modal>
  );
}
