import { auth } from "@/services/auth-service";
import styles from "./GridCardLoader.module.css";

export default function GridCardLoader() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    data.push(
      <div key={`CardGridStub_${i}`} className={`${styles.card}`}>
        <div className={styles.title}>
          <div className={`${styles.text}`}> </div>
          <div className={`${styles.text}`}> </div>
        </div>
      </div>
    );
  }
  return <div className={styles.cardGrid}>{data}</div>;
}
