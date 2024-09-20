import { NextResponse } from "next/server";
import ApiError from "./apiError";
import OpensubError from "./opensubError";
import TmdbError from "./tmdbError";

export default function ErrorHandler(err: Error) {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { message: err.message, errors: err.errors },
      { status: err.status }
    );
  }
  if (err instanceof OpensubError) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: err.status || 500 }
    );
  }
  if (err instanceof TmdbError) {
    return NextResponse.json(
      { message: err.message, error: err },
      { status: err.status || 500 }
    );
  }
  return NextResponse.json({ message: "Unexpected error"}, {status: 500});
}
