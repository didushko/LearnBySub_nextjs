"use client";
import { signIn, signOut } from "next-auth/react";
import styles from "./AuthButtons.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import ResponsiveNavigation from "../common/ResponsiveNavigation";

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (
          option: {
            bot_id: string;
            origin: string;
            embed: number;
            request_access: string;
          },
          data: any
        ) => void;
      };
    };
  }
}

export function SignOutButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";
  return (
    <button
      onClick={() =>
        signOut({ callbackUrl: "/signin?callback=" + pathname + params })
      }
    >
      Signin out
    </button>
  );
}

export function SignInButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const { t } = useTranslation();
  return (
    <ResponsiveNavigation
      className={styles.login}
      path={`/signin?callback=${pathname}${params}`}
      mode="border"
    >
      {t("sign_in")}
    </ResponsiveNavigation>
  );
}

export function AuthProviders({
  providers,
}: {
  providers: { bot_id?: string; google: boolean };
}) {
  const searchParams = useSearchParams();
  if (!providers) {
    return null;
  }
  return (
    <>
      <hr className={styles.providersAfter} />
      <div className={styles.providers}>
        {providers.google && (
          <GoogleSignIn callbackPath={searchParams.get("callback") || "/"} />
        )}
        <TelegramSignIn
          bot_id={providers.bot_id}
          callback={searchParams.get("callback") || "/"}
        />
      </div>
    </>
  );
}

function GoogleSignIn({ callbackPath }: { callbackPath: string }) {
  return (
    <div
      onClick={async (e) => {
        e.currentTarget.classList.add(styles.loading);
        await signIn("google", { callbackUrl: callbackPath || "/" });
      }}
      className={styles.button}
    >
      <div className={styles.googleIcon}></div>
    </div>
  );
}

function TelegramSignIn({
  bot_id,
  callback,
}: {
  bot_id?: string;
  callback: string;
}) {
  if (!bot_id) {
    return null;
  }
  const bot = process.env.TELEGRAM_BOT_TOKEN?.split(":")[0];
  return (
    <>
      <script src="https://telegram.org/js/telegram-widget.js?22" async />
      <div
        className={styles.button}
        onClick={async (e) => {
          e.currentTarget.classList.add(styles.loading);
          window.Telegram.Login.auth(
            {
              bot_id: bot_id + "sd",
              origin: globalThis.location.origin + "asd",
              embed: 1,
              request_access: "write",
            },
            (data: any) => {
              try {
                signIn("telegram", { ...data, callbackUrl: callback });
              } catch (e) {
                console.log(e);
              }
            }
          );
          window.Telegram;
        }}
      >
        <div className={styles.telegramIcon}></div>
      </div>
    </>
  );
}
