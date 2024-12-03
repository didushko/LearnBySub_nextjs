import { redirect } from "next/navigation";
import { profileTabs } from "./profilePagesList";

export default function EmptyProfilePage() {
  redirect(`profile/${profileTabs()[0].key}`);
}
