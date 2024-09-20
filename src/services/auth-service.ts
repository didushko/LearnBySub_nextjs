import NextAuth, { DefaultSession, User as IUser } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { object, string } from "zod";
import userService from "@/services/user-service";
import telegramService from "@/services/telegram-service";
import { AUTH_EXPIRE_TIME } from "@/constants";
import Facebook from "next-auth/providers/facebook";

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
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
      provider?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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

          let user = await userService.login(email, password);

          return { ...user, type: "credentials" };
        } catch (error) {
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
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.account) {
        if (params.account.provider)
          params.token.provider = params.account.provider;
      }
      return params.token;
    },
    async session(params) {
      if (params.token && params.token.provider) {
        params.session.user.provider = params.token.provider.toString();
        if (params.token.sub)
          params.session.user.id =
            params.session.user.provider + "-" + params.token.sub;
      }

      return params.session;
    },
  },
  session: {
    maxAge: AUTH_EXPIRE_TIME,
  },
  pages: {
    signIn: "/signIn",
  },
});
