import Image from "next/image";
import { TMDB_IMAGE } from "@/constants";

interface ImageProps {
  posterPath?: string;
  backdropPath?: string;
  title: string;
  fallbackSrc?: string | false;
  sizes: string;
  blurUrl?: string;
}

const defaultSrc =
  "https://www.opensubtitles.com/assets/no-poster-687b463a9c7498bc44a03bd527099fed926854c5cc2eb18cf9307bba4ee935df.png";

export default async function PosterImage({
  posterPath,
  backdropPath,
  title,
  fallbackSrc = defaultSrc,
  sizes,
}: ImageProps) {
  const poster_full =
    (posterPath && `${TMDB_IMAGE}/original${posterPath}`) ||
    (backdropPath && `${TMDB_IMAGE}/original${backdropPath}`);
  const poster_small =
    (posterPath && `${TMDB_IMAGE}/w92${posterPath}`) ||
    (backdropPath && `${TMDB_IMAGE}/w300${backdropPath}`);

  if (!posterPath && !backdropPath && fallbackSrc === false) {
    return null;
  }
  const blureImage = poster_small ? await generateBlurImage(poster_small) : "";
  return (
    <Image
      src={poster_full || defaultSrc}
      alt={"poster for" + title}
      fill={true}
      placeholder={blureImage ? "blur" : "empty"}
      blurDataURL={blureImage || ""}
      sizes={sizes}
    />
  );
}

async function generateBlurImage(src: string) {
  try {
    const img = await fetch(src);
    if (!img.ok) {
      return "";
    }
    const buffer = Buffer.from(await img.arrayBuffer());
    const base64 = buffer.toString("base64");
    return "data:image/png;base64," + base64;
  } catch (e) {
    return "";
  }
}
