import Link from "next/link";
import { Suspense } from "react";
import styles from "./Header.module.css";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/SearchResult";
import ProfileButton from "./ProfileButton";
import Loader from "../loaders/Loader";
import { SignOutButton } from "../auth/AuthButtons";

const Header = async ({ query }: { query: string }) => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.headerLogo}>
          <span>LearnBySub</span>
        </div>
      </Link>
      <div className={styles.headerElements}>
        <SearchBar>
          <Suspense key={"search" + query} fallback={<Loader />}>
            <SearchResult query={query} />
          </Suspense>
        </SearchBar>
        <div>
          <SignOutButton />
        </div>
        <ProfileButton />
        {/* <UILangMenu />
        {<NavigateElement to="/profile">Profile: {email}</NavigateElement> */}
      </div>
      {/* <BurgerMenu /> */}
    </div>
  );
};

export default Header;
