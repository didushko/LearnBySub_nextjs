"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Season } from "@/interfaces/feature";
import SelectSectionLoader from "../subtitles/loaders/SelectSectionLoader";
import styles from "./EpisodeSelector.module.css";

const EpisodeSelector = function ({
  seasons,
  children,
}: {
  seasons: Season[];
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const [selectedSeason, SetSeason] = useState(
    Number(searchParams.get("season")) || 0
  );
  const [selectedEpisode, setEpisode] = useState(
    Number(searchParams.get("episode")) || 0
  );

  const isLoading =
    searchParams.get("season") !== selectedSeason.toString() ||
    searchParams.get("episode") !== selectedEpisode.toString();

  const setParams = (season: number, episode: number) => {
    const params = new URLSearchParams(searchParams);
    if (season.toString() !== searchParams.get("season")) {
      setEpisode(0);
    }
    params.set("season", season.toString());
    params.set("episode", episode.toString());
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setParams(selectedSeason, selectedEpisode);
  }, [selectedSeason, selectedEpisode]);
  return (
    <>
      <section className={styles.section}>
        <select
          id={"season-selector"}
          className={styles.selector}
          value={selectedSeason}
          onChange={(e) => SetSeason(Number(e.target.value))}
          disabled={isLoading}
        >
          {seasons.map((s, i) => (
            <option key={"season" + i} value={i}>
              Season {s.season_number}
            </option>
          ))}
        </select>
        <select
          key={"e_selector" + selectedSeason}
          id={"episode-selector"}
          className={styles.selector}
          value={selectedEpisode}
          onChange={(e) => setEpisode(Number(e.target.value))}
          disabled={isLoading}
        >
          {seasons[selectedSeason].episodes.map((e, i) => (
            <option key={"s" + selectedSeason + "episode" + i} value={i}>
              Episode {e.episode_number}: {e.title}
            </option>
          ))}
        </select>
      </section>
      {isLoading ? <SelectSectionLoader /> : children}
    </>
  );
};
export default EpisodeSelector;
