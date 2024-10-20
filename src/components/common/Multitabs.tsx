"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./Multitabs.module.css";
import { useTranslation } from "react-i18next";
export interface TabOptions {
  value: string;
  label: string;
}
const Multitabs = ({
  tabs,
  paramName,
}: {
  tabs: TabOptions[];
  paramName: string;
}) => {
  const {t} = useTranslation("home")
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setParams = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const getClassName = (key: string, i: number) => {
    let paramValue = searchParams.get(paramName);
    if (paramValue) {
      return paramValue === key
        ? `${styles.tab} ${styles.selected}`
        : styles.tab;
    } else {
      return i === 0 ? `${styles.tab} ${styles.selected}` : styles.tab;
    }
  };
  return (
    <div className={styles.multitabs}>
      {tabs.map((el, i) => (
        <div
          key={el.value}
          className={getClassName(el.value, i)}
          onClick={(e) => {
            const value = el.value;
            if (searchParams.get(paramName) !== value) {
              e.currentTarget.classList.add(styles.loading);
            }
            setParams(el.value);
          }}
        >
          {t(el.label)}
        </div>
      ))}
    </div>
  );
};

export default Multitabs;
