import subStoreService, {
  ISubStoreWithRate,
} from "@/services/subStore-service";
import style from "./SelectSection.module.css";
import Link from "next/link";
import Play from "./play/Play";
import { DownloadStoredItemButton } from "../common/buttons/DownloadStoredItemButton";
import { Suspense } from "react";
import SelectSectionLoader from "./loaders/SelectSectionLoader";
import userSettingsService from "@/services/userSettings-service";

interface ISelectSectionProps {
  userId: string;
  mediaId: number;
  mediaType: "tv" | "movie";
  originalName: string;
  seasonNumber?: string;
  episodeNumber?: string;
  seasonIndex?: string;
  episodeIndex?: string;
  showModal: "idioms" | "phrases" | "words" | undefined;
}

export async function SelectSection({
  userId,
  mediaId,
  mediaType,
  originalName,
  seasonNumber,
  episodeNumber,
  seasonIndex,
  episodeIndex,
  showModal,
}: ISelectSectionProps) {
  let id = mediaId.toString();
  if (mediaType === "tv") {
    if (!seasonNumber || !episodeNumber) {
      return <div>No founded subtitles</div>;
    }
    id += "s" + seasonNumber + "e" + episodeNumber;
  }

  const playData = await subStoreService.getFilteredItem(userId, id, mediaType);
  const userSettings = await userSettingsService.get(userId);

  return (
    <section about="StartLearningButtons" className={style.section}>
      <DownloadStoredItemButton
        id={mediaId}
        type={mediaType}
        lang={userSettings.learningLanguage}
        inStore={!!playData}
        originalName={originalName}
        seasonNumber={seasonNumber}
        episodeNumber={episodeNumber}
        path={`/media/${mediaType}/${mediaId}`}
      />
      <Link
        href={{
          query: {
            season: seasonIndex,
            episode: episodeIndex,
            showModal: "idioms",
          },
        }}
        scroll={false}
        replace={true}
      >
        <div className={`${style.button} ${style.idioms}`}>
          <div>Idioms: top 10</div>
          {getStats(playData, "idioms")}
        </div>
      </Link>
      <Link
        href={{
          query: {
            season: seasonIndex,
            episode: episodeIndex,
            showModal: "phrases",
          },
        }}
        scroll={false}
        shallow={true}
        replace={true}
      >
        <div className={`${style.button} ${style.button}`}>
          <div>Verbal phrases: top 10</div>
          {getStats(playData, "phrases")}
        </div>
      </Link>
      <Link
        href={{
          query: {
            season: seasonIndex,
            episode: episodeIndex,
            showModal: "words",
          },
        }}
        scroll={false}
        shallow={true}
        replace={true}
      >
        <div className={`${style.button} ${style.button}`}>
          <div>Words: top 10</div>
          {getStats(playData, "words")}
        </div>
      </Link>
      {!!playData && showModal && <Play data={playData[showModal]} />}
    </section>
  );
}

const SelectSectionWithSuspense = async (args: ISelectSectionProps) => (
  <Suspense key={args.toString()} fallback={<SelectSectionLoader />}>
    <SelectSection {...args} />
  </Suspense>
);

export default SelectSectionWithSuspense;

function getStats(
  subsData: ISubStoreWithRate | null,
  key: "idioms" | "phrases" | "words"
) {
  return (
    <div>
      {subsData
        ? `I already know:   ${subsData?.excludedItemsCount[key]}/${subsData[key].length}`
        : "   No stats"}
    </div>
  );
}
