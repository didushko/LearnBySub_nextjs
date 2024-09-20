"use server";

import { signIn } from "@/services/auth-service";
import ApiError from "@/exceptions/apiError";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signInAction(formData: FormData, pathname: string) {
  try {
    await signIn("credentials", formData);
    return redirect(pathname || "/");
  } catch (e) {
    if (e instanceof AuthError) {
      if (
        e.cause?.err instanceof ApiError ||
        e.cause?.err instanceof ZodError
      ) {
        return e.cause?.err?.errors;
      }
      return { message: "Unexpected error" };
    }
    throw e;
  }
}
