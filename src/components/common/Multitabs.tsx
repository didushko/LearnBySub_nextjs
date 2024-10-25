import styles from "./Multitabs.module.css";
import ResponsiveNavigation from "./ResponsiveNavigation";

export interface TabOptions {
  value: string;
  label: string;
}
const Multitabs = async ({
  tabs,
  paramName,
}: {
  tabs: TabOptions[];
  paramName: string;
}) => {
  return (
    <div className={styles.multitabs}>
      {tabs.map((el, i) => (
        <ResponsiveNavigation
          updateParams={{ [paramName]: i === 0 ? null : el.value }}
          mode="border"
          className={styles.tab}
          selectedClassName={styles.selected}
        >
          {el.label}
        </ResponsiveNavigation>
      ))}
    </div>
  );
};

export default Multitabs;
