import Image from "next/image";
import libraryIcon from "../../../../public/library.svg";
import ResponsiveNavigation from "../ResponsiveNavigation";

const LibraryButton = ({ size = 50 }: { size?: number }) => (
  <ResponsiveNavigation path={"/library"} mode="hoverHeight" around>
    <Image
      width={size}
      height={size}
      src={libraryIcon}
      alt={"Go to library icon"}
    />
  </ResponsiveNavigation>
);

export default LibraryButton;
