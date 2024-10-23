import Link from "next/link";
import styles from "./Header.module.css";
import SearchBar from "../search/SearchBar";
import ProfileButton from "./ProfileButton";
import LibraryButton from "../library/buttons/LibraryButton";
import initTranslations from "@/commons/i18n";
import TranslationsProvider from "../providers/TranslationsProvider";
import HideOnAuthPagesWrapper from "../common/hide-on-auth-pages-wrapper";
import LanguageChanger from "../common/changer";

const i18nNamespaces = ["header"];
interface IHeaderProps {
  locale: string;
}

const Header = async ({ locale }: IHeaderProps) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className={styles.header} id={"header"}>
        <Link href="/">
          <div className={styles.headerLogo}>
            <span>LearnBySub</span>
          </div>
        </Link>
        <div className={styles.headerElements}>
          <SearchBar />
          {/* <TestCounter /> */}
          <div>
            <LibraryButton size={30} />
          </div>
          <ProfileButton />
          <LanguageChanger />
          {/* <UILangMenu />
        {<NavigateElement to="/profile">Profile: {email}</NavigateElement> */}
        </div>
        {/* <BurgerMenu /> */}
      </div>
    </TranslationsProvider>
  );
};

const HideOnAuthHeader = async (args: IHeaderProps) => (
  <HideOnAuthPagesWrapper>
    <Header {...args} />
  </HideOnAuthPagesWrapper>
);

export default HideOnAuthHeader;
