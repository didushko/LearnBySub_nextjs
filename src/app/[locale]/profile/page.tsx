import { redirect } from "next/navigation";
import { profileTabs } from "./profilePages";

export default function EmptyProfilePage() {
  redirect(`profile/${profileTabs()[0].key}`);
}
