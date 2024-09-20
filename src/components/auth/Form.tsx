"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Form.module.css";
import { signInAction } from "@/actions/authActions";
import { ZodIssue } from "zod";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";

export default function Form({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const [errors, setErrors] = useState<
    ZodIssue[] | Error[] | { message: string } | any
  >([]);
  const getError = (field: string) => {
    if (Array.isArray(errors)) {
      const filtred = errors.map((err: ZodIssue) => {
        if ("path" in err && err.path.includes(field)) {
          return err.message;
        }
      });
      if (filtred.length) {
        return filtred[0];
      }
    }
  };
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (errors && Array.isArray(errors)) {
      errors.forEach((err) => {
        if ("path" in err) {
          err.path.forEach((field: string) => {
            let el = document.getElementById(field + "-error");
            if (el) {
              el.innerHTML = err.message;
            }
          });
        }
      });
    }
  }, [errors]);
  return (
    <form
      className={styles.signForm}
      action={async (formData) => {
        document.getElementById("formContainer")?.classList.add(styles.loading);
        let errors = await signInAction(
          formData);
        document
          .getElementById("formContainer")
          ?.classList.remove(styles.loading);
        setErrors(errors || []);
        router.push(searchParams.get("callback") || "/");
      }}
    >
      {children}
    </form>
  );
}
