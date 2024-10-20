"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { getCleanPathname } from "../../../i18nConfig";

const hideRoutes = new Set(["/signin"]);

export default function ShowOnAuthPagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const params = useSearchParams();

  const shouldShowHeader = !hideRoutes.has(getCleanPathname(path));
  return shouldShowHeader && children;
}
