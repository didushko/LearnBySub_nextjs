"use client";
import { signIn, signOut } from "next-auth/react";
import styles from "./AuthButtons.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin?callback=" + pathname })}
    >
      Signin out
    </button>
  );
}

export function SignInButton() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      onClick={() =>
        // signIn(undefined, { callbackUrl: "/asd/asds" })
        router.push("/signin?callback=" + pathname)
      }
    >
      Sign in
    </button>
  );
}

export function Providers({
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
        {providers.google ? (
          <GoogleSignIn callbackPath={searchParams.get("callback") || "/"} />
        ) : null}
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
      onClick={() => signIn("google", { callbackUrl: callbackPath || "/" })}
      className={styles.button}
    >
      <div className={styles.googleIcon}></div>
      {/* <div className={styles.googleTitle}>SignIn with Google</div> */}
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
  const pathname = usePathname();
  if (!bot_id) {
    return null;
  }
  const bot = process.env.TELEGRAM_BOT_TOKEN?.split(":")[0];
  return (
    <>
      <script src="https://telegram.org/js/telegram-widget.js?22" async />
      <div
        className={styles.button}
        onClick={() =>
          window.Telegram.Login.auth(
            {
              bot_id,
              origin: globalThis.location.origin,
              embed: 1,
              request_access: "write",
            },
            (data: any) => {
              signIn("telegram", { ...data, callbackUrl: callback });
            }
          )
        }
      >
        <div className={styles.telegramIcon}></div>
      </div>
    </>
  );
}
