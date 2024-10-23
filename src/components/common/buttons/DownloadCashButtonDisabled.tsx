import downloadDisabledIcon from "../../../../public/download-disabled-icon.svg";
import styles from "./Button.module.css";
import Image from "next/image";

export function DownloadCashButtonDisabled({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  return (
    <div className={`${styles.button} ${isLoading ? styles.loading : ""}`}>
      <Image
        width={50}
        height={50}
        src={downloadDisabledIcon}
        alt={"Download disabled"}
      />
    </div>
  );
}
