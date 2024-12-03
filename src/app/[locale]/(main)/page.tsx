import styles from "./page.module.css";
import Multitabs from "@/components/common/Multitabs";
import CardsGrid from "@/components/media/CardsGrid";
import React from "react";

import initTranslations from "@/commons/i18n";

const typesList = ["movie", "tv"] as const;

const discoverList = [
  "top_rated",
  "trend_week",
  "trend_day",
  "popular",
] as const;

export type TypeOptions = (typeof typesList)[number];
export type DiscoverOptions = (typeof discoverList)[number];

const i18nNamespaces = ["home"];

export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: {
    type?: TypeOptions;
    discover?: DiscoverOptions;
  };
  params: {
    locale: string;
  };
}) {
  const { t, resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );
  return (
    <>
      <div className={styles.discoverTabs}>
        <Multitabs
          tabs={typesList.map((item) => ({
            value: item,
            label: t(`${item}`),
          }))}
          paramName="type"
        />
        <Multitabs
          tabs={discoverList.map((item) => ({
            value: item,
            label: t(`${item}`),
          }))}
          paramName="discover"
        />
      </div>
      <CardsGrid
        locale={params.locale}
        type={searchParams?.type || typesList[0]}
        discover={searchParams?.discover || discoverList[0]}
      />
    </>
  );
}
