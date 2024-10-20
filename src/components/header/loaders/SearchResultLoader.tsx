import styles from "./SearchResultLoader.module.css";
import originalStyles from "../search/SearchResult.module.css";

export default function SearchResultLoader() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    data.push(
      <div key={i} className={originalStyles.resultContainer}>
        <div
          className={`${originalStyles.imageContainer} ${styles.loading}`}
        ></div>
        <div className={styles.title}>
          <div className={styles.text}></div>
          <div className={styles.text}> </div>
          <div className={styles.text}> </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${originalStyles.result} ${styles.loadingContainer}`}>
      {data}
    </div>
  );
}
