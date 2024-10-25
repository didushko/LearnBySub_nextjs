import { Config } from "next-i18n-router/dist/types";

const i18nConfig: Config = {
  locales: ["uk", "en", "sr", "de", "es", "hr"],
  defaultLocale: "uk",
  prefixDefault: true,
};

export function getCleanPathname(pathname: string): string {
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const locale = i18nConfig.locales.includes(segments[0]) ? segments[0] : "";
  const cleanPath = locale ? segments.slice(1).join("/") : segments.join("/");
  return cleanPath ? `/${cleanPath}` : "/";
}

export default i18nConfig;
