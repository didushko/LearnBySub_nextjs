import { auth } from "@/services/auth-service";
import styles from "./UserInfo.module.css";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "../auth/AuthButtons";
import { profileTabs } from "@/app/[locale]/(main)/profile/profilePagesList";
import ResponsiveNavigation from "../common/ResponsiveNavigation";

export default async function UserInfo({ page }: { page?: string }) {
  const session = await auth();

  const tabs = profileTabs();
  return (
    <div className={styles.user_container}>
      <div>
        {session!.user.image ? (
          <Image
            src={session.user.image}
            alt="user profile image"
            width={200}
            height={200}
            className={styles.image}
          />
        ) : (
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>
      <div className={styles.userMenu}>
        {tabs.map((tab) => (
          <ResponsiveNavigation
            path={tab.key}
            key={tab.key}
            mode="hoverHeight"
            around={false}
            className={page === tab.key ? styles.selected : styles.userMenuItem}
            blure={true}
          >
            {tab.name}
          </ResponsiveNavigation>
        ))}
        <SignOutButton />
      </div>
    </div>
  );
}
