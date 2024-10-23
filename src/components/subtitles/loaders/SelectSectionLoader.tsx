import { DownloadCashButtonDisabled } from "@/components/common/buttons/DownloadCashButtonDisabled";
import style from "../SelectSection.module.css";
export default function SelectSectionLoader() {
  return (
    <section about="StartLearningButtons" className={style.section}>
      <DownloadCashButtonDisabled isLoading={true} />
      <div className={`${style.button} ${style.idioms} ${style.loading}`}>
        <div>Loading idioms</div>
      </div>
      <div className={`${style.button} ${style.button} ${style.loading}`}>
        <div>Loading verbal phrases</div>
      </div>
      <div className={`${style.button} ${style.button} ${style.loading}`}>
        <div>Loading words</div>
      </div>
    </section>
  );
}
