import { auth } from "@/services/auth-service";
import i18nConfig, { getCleanPathname } from "../i18nConfig";
import { i18nRouter } from "next-i18n-router";

const defaultLocale = i18nConfig.defaultLocale;

const authPages = ["/signin", "/signup"];
const allowWithoutAuth = [...authPages, "/", ""];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const cleanPathname = getCleanPathname(pathname);
  if (!req.auth) {
    if (cleanPathname && !allowWithoutAuth.includes(cleanPathname)) {
      const newUrl = new URL(`signin`, req.nextUrl.origin);
      newUrl.searchParams.set("callback", req.nextUrl.pathname);
      return Response.redirect(newUrl);
    }
  } else {
    if (cleanPathname && authPages.includes(cleanPathname)) {
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
