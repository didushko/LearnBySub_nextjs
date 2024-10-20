import React, { Suspense } from "react";
import { IDetailsMovie, IDetailsTv } from "../../interfaces/media";
import { SelectSection } from "../subtitles/SelectSection";
import EpisodeSelector from "./EpisodeSelector";
import openSubService from "@/services/openSub-service";
import SelectSectionLoader from "../subtitles/loaders/SelectSectionLoader";

const SubtitlesSection = async function ({
  userId,
  media,
  originalName,
  type,
  seasonIndex,
  episodeIndex,
  showModal,
}: {
  userId: string;
  media: IDetailsTv | IDetailsMovie;
  originalName: string;
  type: "tv" | "movie";
  seasonIndex?: string;
  episodeIndex?: string;
  showModal?: "idioms" | "phrases" | "words" | undefined;
}) {
  let seasons;
  if (type === "tv") {
    media = media as IDetailsTv;
    seasons = await openSubService.getSeasons(media.id, media.original_name);
  }
  let subtitles;
  if (type == "tv") {
    subtitles = seasons ? (
      <EpisodeSelector seasons={seasons}>
        <Suspense
          key={"Selection" + media.id + "s" + seasonIndex + "e" + episodeIndex}
          fallback={<SelectSectionLoader />}
        >
          <SelectSection
            userId={userId}
            mediaId={media.id}
            mediaType={type}
            originalName={originalName}
            seasonNumber={seasons[
              Number(seasonIndex) || 0
            ].season_number.toString()}
            episodeNumber={seasons[Number(seasonIndex) || 0].episodes[
              Number(episodeIndex) || 0
            ].episode_number.toString()}
            showModal={showModal}
            seasonIndex={seasonIndex}
            episodeIndex={episodeIndex}
          />
        </Suspense>
      </EpisodeSelector>
    ) : (
      //TODO
      <div>No subtitles founded</div>
    );
  } else {
    subtitles = (
      <Suspense key={"Selection" + media.id} fallback={<SelectSectionLoader />}>
        <SelectSection
          userId={userId}
          mediaId={media.id}
          originalName={originalName}
          mediaType={type}
          showModal={showModal}
        />
      </Suspense>
    );
  }
  return <section>{subtitles}</section>;
};
export default SubtitlesSection;
