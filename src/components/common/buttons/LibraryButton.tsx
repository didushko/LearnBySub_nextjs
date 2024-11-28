import Image from "next/image";
import libraryIcon from "../../../../public/library.svg";
import ResponsiveNavigation from "../ResponsiveNavigation";
import styles from "./Button.module.css";

const LibraryButton = ({ size = 50 }: { size?: number }) => (
  <ResponsiveNavigation
    path={"/library"}
    mode="hoverHeight"
    around
    className={`${styles.button} ${styles.scale}`}
  >
    <Image
      width={size}
      height={size}
      src={libraryIcon}
      alt={"Go to library icon"}
    />
  </ResponsiveNavigation>
);

export default LibraryButton;
