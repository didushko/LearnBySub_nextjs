import { cookies } from "next/headers";

export default async function NotFound() {
  const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "NO LANG";

  return <div>{lang}</div>;
}
