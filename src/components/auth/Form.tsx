"use client";

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { signInAction } from "@/actions/authActions";
import { ZodIssue } from "zod";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Form({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const [errors, setErrors] = useState<
    ZodIssue[] | Error[] | { message: string } | any
  >([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("error")) {
      toast.error(
        "There was a problem when trying to authenticate. Please contact us if this error persists"
      );
    }
  }, [searchParams]);

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
    } else toast.error("Something went wrong, please try later");
  }, [errors]);
  return (
    <form
      className={styles.signForm}
      action={async (formData) => {
        document.getElementById("formContainer")?.classList.add(styles.loading);
        document.getElementById("sendButton")?.classList.add(styles.loading);
        setErrors([]);
        const errors = await signInAction(formData);
        if (errors) {
          document
            .getElementById("formContainer")
            ?.classList.remove(styles.loading);
          document
            .getElementById("sendButton")
            ?.classList.remove(styles.loading);
          setErrors(errors || []);
        }
      }}
    >
      {children}
    </form>
  );
}
