"use client";
import { ReactElement, useCallback, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useModalComponent from "@/hooks/useModalComponent";
import styles from "./SearchBar.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/loaders/Loader";

export default function SearchBar({ children }: { children: ReactElement }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debaunsedSearchQuery = useDebounce(searchQuery, 300);
  const { setModalVisible, ModalComponent } = useModalComponent(
    "nonDrop",
    !!searchQuery
  );

  const setParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const searchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setModalVisible(true);
  };

  useEffect(() => {
    setParams(debaunsedSearchQuery);
  }, [debaunsedSearchQuery,]);
  return (
    <>
      <ModalComponent
        key={"SearchModal" + searchParams.get("search")}
        backdropeStyleClass={styles.BackDropWraper}
        dropCallback={() => {
          setParams("");
        }}
      >
        {(searchParams.get("search") || "") === debaunsedSearchQuery ? (
          children
        ) : (
          <Loader />
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
          placeholder="Пошук..."
          onChange={searchHandle}
          value={searchQuery}
          onFocus={() => {
            setModalVisible(true);
            setParams(debaunsedSearchQuery);
          }}
        />
      </div>
    </>
  );
}
