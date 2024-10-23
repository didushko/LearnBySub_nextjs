import { redirect, RedirectType } from "next/navigation";

export default function Page(props: any): any {
  const params = new URLSearchParams(props.searchParams);
  const newPath = `/search?${params.toString()}`;
  redirect(newPath, RedirectType.replace);
}
