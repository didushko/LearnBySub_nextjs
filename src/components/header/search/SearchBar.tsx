"use client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useModalComponent from "@/hooks/useModalComponent";
import styles from "./SearchBar.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SearchResultLoader from "../loaders/SearchResultLoader";
import { useTranslation } from "react-i18next";

export default function SearchBar({ children }: { children: ReactElement }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debaunsedSearchQuery = useDebounce(searchQuery, 300);
  const { setModalVisible, ModalComponent } = useModalComponent(
    "nonDrop",
    !!searchQuery
  );

  const setParams = useCallback(
    (value: string) => {
      if (value !== searchParams.get("search")) {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        replace(`${pathName}?${params.toString()}`);
      }
    },
    [pathName, replace, searchParams]
  );

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setParams(debaunsedSearchQuery);
  }, [debaunsedSearchQuery, setParams]);

  useEffect(() => {
    setModalVisible(false);
  }, [pathName, setModalVisible]);
  return (
    <>
      <ModalComponent
        backdropeStyleClass={styles.BackDropWraper}
        dropCallback={() => {
          setModalVisible(false);
        }}
      >
        {(searchParams.get("search") || "") === debaunsedSearchQuery ? (
          children
        ) : (
          <SearchResultLoader />
        )}
      </ModalComponent>

      <div
        className={`${styles.searchBarStyle} ${"nonDrop"}`}
        onClick={() => setModalVisible(true)}
        onKeyDown={(e) => {
          e.currentTarget.classList.add(styles.typed);
        }}
        onKeyUp={(e) => {
          if (e.key == "Escape") {
            setModalVisible(false);
            setParams("");
          }
          e.currentTarget.classList.remove(styles.typed);
        }}
      >
        <div className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          autoComplete="off"
          name="search-features"
          id="search-features"
          placeholder={t("search")}
          onChange={searchHandle}
          value={searchQuery}
          onFocus={() => {
            if (debaunsedSearchQuery) {
              setModalVisible(true);
              setParams(debaunsedSearchQuery);
            }
          }}
        />
      </div>
    </>
  );
}
