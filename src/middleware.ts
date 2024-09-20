import { auth } from "@/services/auth-service";

const authPages = ["/signin", "/signup"];

const allowWithoutAuth = [...authPages, "/"];

export default auth((req) => {
  if (!req.auth) {
    if (!allowWithoutAuth.includes(req.nextUrl.pathname)) {
      const newUrl = new URL("/signin", req.nextUrl.origin);
      newUrl.searchParams.set("callback", req.nextUrl.pathname);
      return Response.redirect(newUrl);
    }
  } else {
    if (authPages.includes(req.nextUrl.pathname)) {
      const callback = req.nextUrl.searchParams.get("callback");
      const newUrl = new URL(callback || "/", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
