"use client";
import { signIn, signOut } from "next-auth/react";
import styles from "./AuthButtons.module.css";
import { usePathname } from "next/navigation";

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
  return (
    <button onClick={() => signOut({ callbackUrl: "/signin" })}>
      Signin out
    </button>
  );
}

export function SignInButton() {
  return <button onClick={() => signIn()}>Sign in</button>;
}

export function Providers({
  providers,
}: {
  providers: { bot_id?: string; google: boolean };
}) {
  if (!providers) {
    return null;
  }
  return (
    <>
      <hr className={styles.providersAfter} />
      <div className={styles.providers}>
        {providers.google ? <GoogleSignIn /> : null}
        <TelegramSignIn bot_id={providers.bot_id} />
      </div>
    </>
  );
}

function GoogleSignIn() {
  const pathname = usePathname();
  return (
    <div
      onClick={() => signIn("google", { callbackUrl: pathname || "/" })}
      className={styles.button}
    >
      <div className={styles.googleIcon}></div>
      {/* <div className={styles.googleTitle}>SignIn with Google</div> */}
    </div>
  );
}

function TelegramSignIn({ bot_id }: { bot_id?: string }) {
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
              signIn("telegram", data);
            }
          )
        }
      >
        <div className={styles.telegramIcon}></div>
      </div>
    </>
  );
}
