import Link from "next/link";
import Image from "next/image";
import libraryIcon from "../../../../public/library.svg";

const LibraryButton = ({ size = 50 }: { size?: number }) => (
  <Link href={"/library"}>
    <Image
      width={size}
      height={size}
      src={libraryIcon}
      alt={"Go to library icon"}
    />
  </Link>
);

export default LibraryButton;
