import { auth } from "@/services/auth-service";
import i18nConfig, { getCleanPathname } from "../i18nConfig";
import { i18nRouter } from "next-i18n-router";
import { ALLOW_WITHOUT_AUTH, AUTH_PAGES } from "./constants";

const defaultLocale = i18nConfig.defaultLocale;

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const cleanPathname = getCleanPathname(pathname);
  if (!req.auth) {
    if (cleanPathname && !ALLOW_WITHOUT_AUTH.includes(cleanPathname)) {
      const newUrl = new URL(`signin`, req.nextUrl.origin);
      newUrl.searchParams.set("callback", req.nextUrl.pathname);
      return Response.redirect(newUrl);
    }
  } else {
    if (cleanPathname && AUTH_PAGES.includes(cleanPathname)) {
      const callback = req.nextUrl.searchParams.get("callback");
      const newUrl = new URL(callback || `/`, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
  return i18nRouter(req, i18nConfig);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*.svg|.*.png|.*.jpg).*)",
  ],
};
