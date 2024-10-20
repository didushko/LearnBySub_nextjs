import Link from "next/link";
import { Suspense } from "react";
import styles from "./Header.module.css";
import SearchBar from "./search/SearchBar";
import SearchResult from "./search/SearchResult";
import ProfileButton from "./ProfileButton";
import LibraryButton from "../library/buttons/LibraryButton";
import SearchResultLoader from "./loaders/SearchResultLoader";
import initTranslations from "@/commons/i18n";
import TranslationsProvider from "../providers/TranslationsProvider";

const i18nNamespaces = ["header"];

const Header = async ({ locale, query }: { locale: string; query: string }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.headerLogo}>
            <span>LearnBySub</span>
          </div>
        </Link>
        <div className={styles.headerElements}>
          <SearchBar>
            <Suspense key={"search" + query} fallback={<SearchResultLoader />}>
              <SearchResult query={query} locale={locale} />
            </Suspense>
          </SearchBar>
          {/* <TestCounter /> */}
          <div>
            <LibraryButton size={30} />
          </div>
          <ProfileButton />
          {/* <UILangMenu />
        {<NavigateElement to="/profile">Profile: {email}</NavigateElement> */}
        </div>
        {/* <BurgerMenu /> */}
      </div>
    </TranslationsProvider>
  );
};

export default Header;
