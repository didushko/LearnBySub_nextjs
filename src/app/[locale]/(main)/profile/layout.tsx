import styles from "./profile.module.css";

export default function ProfileLayout({
  children,
  tab,
}: Readonly<{
  children: React.ReactNode;
  tab: React.ReactNode;
}>) {
  return (
    <div className={styles.profileContainer}>
      {tab}
      {children}
    </div>
  );
}
