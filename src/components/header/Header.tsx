import Link from "next/link";
import styles from "./Header.module.css";
import SearchBar from "../search/SearchBar";
import ProfileButton from "./ProfileButton";
import LibraryButton from "../common/buttons/LibraryButton";
import initTranslations from "@/commons/i18n";
import TranslationsProvider from "../providers/TranslationsProvider";
import HideOnAuthPagesWrapper from "../common/HideOnAuthPagesWrapper";
import LanguageChanger from "../common/Сhanger";
import ResponsiveNavigation from "../common/ResponsiveNavigation";

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
        <div className={styles.headerLogo}>
          <ResponsiveNavigation path="/" mode="hoverHeight" around={false}>
            {/* <div className={styles.headerLogo}> */}
            <span>LearnBySub</span>
          </ResponsiveNavigation>
        </div>
        <div className={styles.headerElements}>
          <SearchBar />
          {/* <TestCounter /> */}
          <LibraryButton size={30} />
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
