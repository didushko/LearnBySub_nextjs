import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
  locales: ["uk", "en", "sr", "de", "es", "hr"],
  defaultLocale: "uk",
  prefixDefault: true,
};

export function getCleanPathname(pathname: string) {
  const segments = pathname.split("/");
  const locale = i18nConfig.locales.includes(segments[1])
    ? segments[1]
    : i18nConfig.defaultLocale;
  return pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, "")
    : pathname;
}

export default i18nConfig;
