import styles from "./page.module.css";
import Multitabs from "@/components/common/Multitabs";
import CardsGrid from "@/components/media/CardsGrid";
import GridCardLoader from "@/components/media/Loaders/GridCardLodader";
import React, { Suspense } from "react";

import TranslationsProvider from "@/components/providers/TranslationsProvider";
import initTranslations from "@/commons/i18n";

export const typesList = ["movie", "tv"] as const;

export const discoverList = [
  "top_rated",
  "trend_week",
  "trend_day",
  "popular",
] as const;

type TypeOptions = (typeof typesList)[number];
type DiscoverOptions = (typeof discoverList)[number];

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
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={params.locale}
      resources={resources}
    >
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
      <Suspense
        key={"GridCard" + searchParams?.type + searchParams?.discover}
        fallback={<GridCardLoader />}
      >
        <CardsGrid
          locale={params.locale}
          type={searchParams?.type || typesList[0]}
          discover={searchParams?.discover || discoverList[0]}
        />
      </Suspense>
    </TranslationsProvider>
  );
}
