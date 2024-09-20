import MediaComponent from "@/components/media/MediaComponent";
import tmdbService from "@/services/tmdb-service";
import { notFound } from "next/navigation";

export default async function Media({
  params,
}: {
  params: { type: "movie" | "tv"; id: number };
}) {
  if (!params || !params.id || !params.type) {
    notFound();
  }
  if (params.type !== "movie" && params.type !== "tv") {
    return <div>Error link</div>;
  }
  try {
    let media = await tmdbService.getDetails(params.type, params.id, "en");
    return <MediaComponent media={media} />;
  } catch (e) {
    console.log(e);
    notFound();
  }
}
