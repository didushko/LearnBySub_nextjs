import styles from "./page.module.css";
import Multitabs from "@/components/common/Multitabs";
import CardsGrid from "@/components/media/CardsGrid";
import { Suspense } from "react";
import Loader from "@/components/loaders/Loader";
import GridCardLoader from "@/components/loaders/GridCardLodader";

const typeOptions = [
  { value: "movie", label: "Films" },
  { value: "tv", label: "Serials" },
] as const;
const discoverOptions = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Top" },
  { value: "trend_day", label: "Trend: Day" },
  { value: "trend_week", label: "Trend: Month" },
] as const;

type TypeOptions = (typeof typeOptions)[number]["value"];
type DiscoverOptions = (typeof discoverOptions)[number]["value"];

export default function Home({
  searchParams,
}: {
  searchParams?: {
    type?: TypeOptions;
    discover?: DiscoverOptions;
    search?: string;
  };
}) {
  return (
    <>
      <div className={styles.discoverTabs}>
        <Multitabs tabs={[...typeOptions]} paramName="type" />
        <Multitabs tabs={[...discoverOptions]} paramName="discover" />
      </div>
      <CardsGrid
        type={searchParams?.type || typeOptions[0].value}
        discover={searchParams?.discover || discoverOptions[0].value}
      />
    </>
  );
}
