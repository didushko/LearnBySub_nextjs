import { signIn } from "@/services/auth-service";
import ErrorHandler from "@/exceptions/errorHandler";
import userService from "@/services/user-service";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
  uiLanguage: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { email, password, uiLanguage } = await req.json();
    const validatedFields = schema.safeParse({
      email,
      password,
      uiLanguage,
    });
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Validation Error",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const user = await userService.registration(email, password, uiLanguage);
    await signIn("credentials", { email, password });
  } catch (error) {
    return ErrorHandler(error as Error);
  }
}
