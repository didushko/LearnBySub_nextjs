import Link from "next/link";
import Image from "next/image";
import libraryIcon from "../../../../public/library.svg";
import LinkWithLoading from "../LinkWithLoading";

const LibraryButton = ({ size = 50 }: { size?: number }) => (
  <LinkWithLoading href={"/library"} mode="hover-height">
    <Image
      width={size}
      height={size}
      src={libraryIcon}
      alt={"Go to library icon"}
    />
  </LinkWithLoading>
);

export default LibraryButton;
