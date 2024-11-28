"use client";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import styles from "./SearchBar.module.css";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { getCleanPathname } from "../../../i18nConfig";
import CloseIcon from "@public/close.svg";
import EraceIcon from "@public/backspace-icon.svg";
import FiltersIcon from "@public/filters-icon.svg";

export default function SearchBarIntercept() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const query = searchParams.get("query");

  const [searchQuery, setSearchQuery] = useState<string | null | false>(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { replace, push, back } = useRouter();
  const cleanPath = getCleanPathname(pathName);
  const isModal = cleanPath === "/searchy";
  const isSearchPage = cleanPath === "/search";
  const needUpdate =
    typeof searchQuery === "string" && (query || "") != debouncedSearchQuery;
  const isLoading = searchQuery === false || needUpdate;

  const closeHandler = () => {
    isModal && back();
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchQuery === false) setSearchQuery(query);
  }, [query, searchQuery]);

  useEffect(() => {
    if (needUpdate) {
      const params = new URLSearchParams(searchParams);
      debouncedSearchQuery
        ? params.set("query", debouncedSearchQuery)
        : params.delete("query");
      if (isSearchPage) {
        replace(`/search/?${params.toString()}`, { scroll: false });
      } else if (isModal) {
        !debouncedSearchQuery && back();
        replace(`/searchy/?${params.toString()}`, { scroll: false });
      } else {
        push(`/searchy/?${params.toString()}`, { scroll: false });
      }
    }
  }, [
    debouncedSearchQuery,
    needUpdate,
    isModal,
    isSearchPage,
    back,
    push,
    replace,
    searchParams,
  ]);

  const eraceIcon = isSearchPage ? (
    <Image
      tabIndex={0}
      className={`${styles.opacityOnHover} ${
        debouncedSearchQuery ? "" : styles.hiddenIcon
      }`}
      width={30}
      height={30}
      src={EraceIcon}
      onClick={closeHandler}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          closeHandler();
          inputRef.current?.focus();
        }
      }}
      alt={"Erace search input"}
      priority
    />
  ) : null;

  const filterIcon = !isSearchPage ? (
    <Image
      tabIndex={0}
      className={styles.opacityOnHover}
      width={20}
      height={20}
      src={FiltersIcon}
      onClick={() => {
        setSearchQuery(false);
        push(`/search/?filters&${searchParams.toString()}`);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          setSearchQuery(false);
          push(`/search/?filters&${searchParams.toString()}`);
        }
      }}
      alt={"Go to filters"}
    />
  ) : null;

  const closeIcon = (
    <Image
      tabIndex={0}
      className={`${styles.opacityOnHover} ${
        debouncedSearchQuery ? "" : styles.hiddenIcon
      }`}
      width={25}
      height={25}
      src={CloseIcon}
      onClick={closeHandler}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          closeHandler();
          inputRef.current?.focus();
        }
      }}
      alt={"Close modal"}
      priority
    />
  );

  return (
    <>
      <div
        className={`${styles.searchBarStyle}`}
        onKeyDown={(e) => {
          e.currentTarget.classList.add(styles.typed);
        }}
        onKeyUp={(e) => {
          e.currentTarget.classList.remove(styles.typed);
        }}
      >
        <div
          className={isLoading ? styles.loader : styles.searchIcon}
          onClick={() =>
            !isSearchPage &&
            push(`/search/?query=${debouncedSearchQuery || ""}`)
          }
        />
        <input
          ref={inputRef}
          className={styles.searchInput}
          autoComplete="off"
          name="search-features"
          id="search-features"
          placeholder={t("search")}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key == "Escape") {
              closeHandler();
            }
            if (e.key === "Enter" && !isSearchPage) {
              push(
                `/search/?${searchQuery ? "query=" + searchQuery + " " : ""}`,
                { scroll: false }
              );
            }
          }}
          value={searchQuery || ""}
        />
        {filterIcon}
        {isSearchPage ? eraceIcon : closeIcon}
      </div>
    </>
  );
}
