import { ISubCash } from "@/database/models/subCash-model";
import dictService from "@/services/dict-service";
import subCashService from "@/services/subCash-service";
import style from "./SelectSection.module.css";
import Link from "next/link";
import Play from "./play/Play";
import { DownloadCashButton } from "../library/buttons/DownloadCashButton";

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
}: {
  userId: string;
  mediaId: number;
  mediaType: "tv" | "movie";
  originalName: string;
  seasonNumber?: string;
  episodeNumber?: string;
  seasonIndex?: string;
  episodeIndex?: string;
  showModal: "idioms" | "phrases" | "words" | undefined;
}) {
  let id = mediaId.toString();
  if (mediaType === "tv") {
    if (!seasonNumber || !episodeNumber) {
      return <div>No founded subtitles</div>;
    }
    id += "s" + seasonNumber + "e" + episodeNumber;
  }
  const subsData = await subCashService.get(id, mediaType);
  let stats = null;
  if (subsData) {
    stats = await dictService.getStatisticsBySubData(userId, subsData);
  }
  return (
    <section about="StartLearningButtons" className={style.section}>
      <DownloadCashButton
        id={mediaId}
        type={mediaType}
        inCash={!!subsData}
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
          {getStats(stats, subsData, "idioms")}
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
          {getStats(stats, subsData, "phrases")}
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
          {getStats(stats, subsData, "words")}
        </div>
      </Link>
      {!!subsData && showModal && <Play data={subsData[showModal]} />}
    </section>
  );
}

function getStats(
  stats: any,
  subsData: ISubCash | null,
  key: "idioms" | "phrases" | "words"
) {
  return (
    <div>
      {stats && subsData
        ? `I already know:   ${stats[key]}/${subsData[key].length}`
        : "   No stats"}
    </div>
  );
}
