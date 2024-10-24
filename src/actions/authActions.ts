"use server";

import { signIn } from "@/services/auth-service";
import ApiError from "@/exceptions/apiError";
import { AuthError } from "next-auth";
import { ZodError } from "zod";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signInAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e instanceof AuthError) {
      if (
        e.cause?.err instanceof ApiError ||
        e.cause?.err instanceof ZodError
      ) {
        return (
          e.cause?.err.errors || {
            message: e.cause.err.message || "Unexpected error",
          }
        );
      }
      return { message: e.message };
    }
    return { message: "Unexpected error" };
  }
}
