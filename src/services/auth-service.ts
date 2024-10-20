import NextAuth, { DefaultSession, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { object, string } from "zod";
import telegramService from "@/services/telegram-service";
import { AUTH_EXPIRE_TIME } from "@/constants";
import Facebook from "next-auth/providers/facebook";
import ApiError from "@/exceptions/apiError";
import { NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";

const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    //TODO
    .min(2, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: string[];
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
      provider?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: string[];
  }
}

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          let response = await fetch(`${process.env.AUTH_URL}/signin`, {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
            }),
          });
          if (response.status === 400) {
            const error = await response.json();
            throw new ApiError(
              400,
              error.message || "Bad request",
              error.errors
            );
          }

          const { user } = await response.json();
          if (user) {
            return user;
          }
          throw new Error("Error when login request");
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
    Credentials({
      id: "telegram",
      name: "Telegram Provider",
      credentials: {},
      authorize: async (credentials, req) => {
        const user = await telegramService.validate(credentials);
        if (user && user.id) {
          return {
            id: user.id,
            name:
              [user.first_name, user.last_name || ""].join(" ") ||
              user.username,
            image: user.photo_url,
          };
        }
        throw Error("Error when telegram login request");
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.account) {
        if (params.account.provider)
          params.token.provider = params.account.provider;
      }
      if (params.user && params.user.roles)
        params.token.roles = params.user.roles;
      return params.token;
    },
    async session(params) {
      if (params.token && params.token.provider) {
        params.session.user.provider = params.token.provider.toString();
        if (params.token.sub)
          params.session.user.id =
            params.session.user.provider + "-" + params.token.sub;
      }

      const newSession: Session = Object.assign({}, params.session);
      if (params.token.roles) {
        newSession.user.roles = params.token["roles"];
        return newSession;
      }
      return params.session;
    },
  },
  session: {
    maxAge: AUTH_EXPIRE_TIME,
  },
  pages: {
    signIn: "/signIn",
    error: "/signin",
  },
});

function authWithCheck(
  ...args: Parameters<typeof auth>
): ReturnType<typeof auth>;
async function authWithCheck(): Promise<Session>;
async function authWithCheck(noRedirect: true): Promise<Session | null>;
function authWithCheck(
  ...args: Parameters<typeof auth> | [] | [true]
): Promise<Session | null> | ReturnType<typeof auth> {
  if (args.length > 0 && typeof args[0] !== "boolean") {
    return auth(...(args as Parameters<typeof auth>));
  }
  const session = auth();

  if (session) {
    return session;
  }
  if (args[0] !== true) {
    NextResponse.redirect("/signin");
  }
  return session;
}

export { handlers, signIn, signOut, authWithCheck as auth };
