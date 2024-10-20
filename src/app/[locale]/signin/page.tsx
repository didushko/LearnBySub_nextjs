import { AuthProviders } from "@/components/auth/AuthButtons";
import Form from "@/components/auth/Form";
import styles from "./signin.module.css";
import React from "react";

export default function SignIn() {
  const authProviders = {
    bot_id: process.env.TELEGRAM_BOT_TOKEN?.split(":")[0],
    google: !!process.env.AUTH_GOOGLE_ID,
  };
  return (
    <>
      <div id={"formContainer"} className={styles.container}>
        <div className={styles.title}>Sign In</div>
        <Form>
          <div className={styles.inputContainer}>
            <input id="email" name="email" type="email" placeholder=" " />
            <label htmlFor="email">Email</label>
            <div id="email-error" className={styles.errorMessage}></div>
          </div>
          <div className={styles.inputContainer}>
            <input
              id="password"
              name="password"
              type="password"
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <div id="password-error" className={styles.errorMessage}></div>
          </div>
          <div className={styles.buttonBlock}>
            <button>Sign In</button>
          </div>
        </Form>
        <AuthProviders providers={authProviders} />
      </div>
    </>
  );
}
