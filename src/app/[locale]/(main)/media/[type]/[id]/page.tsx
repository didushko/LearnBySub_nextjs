import MediaComponent from "@/components/media/MediaComponent";
import tmdbService from "@/services/tmdb-service";
import { notFound } from "next/navigation";

export default async function Media({
  params,
  searchParams,
}: {
  params: { type: "movie" | "tv"; id: number; locale: string };
  searchParams: { [key: string]: string | undefined };
}) {
  let showModal;

  if (searchParams["showModal"]) {
    showModal = searchParams["showModal"] as "idioms" | "phrases" | "words";
  }
  if (!params || !params.id || !params.type) {
    notFound();
  }
  if (params.type !== "movie" && params.type !== "tv") {
    return <div>Error link</div>;
  }
  try {
    let media = await tmdbService.getDetails(
      params.type,
      params.id,
      params.locale
    );
    return (
      <MediaComponent
        media={media}
        type={params.type}
        seasonIndex={searchParams["season"]}
        episodeIndex={searchParams["episode"]}
        showModal={showModal}
        locale={params.locale}
      />
    );
  } catch (e) {
    console.log(e);
    notFound();
  }
}
