import Image from "next/image";
import { TMDB_IMAGE } from "@/constants";

interface ImageProps {
  posterPath?: string;
  backdropPath?: string;
  title: string;
  fallbackSrc?: string | false;
  sizes: string | number;
  blurUrl?: string;
  priority?: boolean;
  backdropSize?: "w300" | "w780" | "w1280" | "original";
}

const posterSizes = [780, 500, 342, 185, 154, 92];

function getPosterSize(size: string | number) {
  if (typeof size === "string") {
    return "original";
  }
  const founded = posterSizes.findLast((s) => s > size);
  return founded ? "w" + founded : "original";
}


const defaultSrc = "/no-poster.png";
export default function PosterImage({
  posterPath,
  backdropPath,
  title,
  fallbackSrc = defaultSrc,
  sizes,
  priority = false,
  backdropSize = "original",
}: ImageProps) {
  const poster_full =
    (posterPath && `${TMDB_IMAGE}/${getPosterSize(sizes)}${posterPath}`) ||
    (backdropPath && `${TMDB_IMAGE}/${backdropSize}${backdropPath}`);
  const poster_small =
    (posterPath && `${TMDB_IMAGE}/w92${posterPath}`) ||
    (backdropPath && `${TMDB_IMAGE}/w300${backdropPath}`);

  if (!posterPath && !backdropPath && fallbackSrc === false) {
    return null;
  }
  if (priority === true)
    return (
      <Image
        src={poster_full || fallbackSrc.toString()}
        alt={title}
        fill={true}
        sizes={typeof sizes === "string" ? sizes : sizes + "px"}
        loading={"eager"}
        priority={priority}
        quality={75}
        fetchPriority={"high"}
      />
    );
  else
    return (
      <PosterImageWithBlur
        poster_full={poster_full || fallbackSrc.toString()}
        poster_small={poster_small || fallbackSrc.toString()}
        title={title}
        sizes={sizes}
      />
    );
}

async function PosterImageWithBlur({
  poster_full,
  poster_small,
  title,
  sizes,
}: {
  poster_full: string | false;
  poster_small?: string;
  title: string;
  sizes: string | number;
}) {
  if (!poster_full || !poster_small) {
    return null;
  }
  const blureImage = await generateBlurImage(poster_small);
  return (
    <Image
      src={poster_full}
      alt={title}
      fill={true}
      placeholder={blureImage ? "blur" : undefined}
      blurDataURL={blureImage}
      sizes={typeof sizes === "string" ? sizes : sizes + "px"}
      fetchPriority={"low"}
      quality={75}
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
