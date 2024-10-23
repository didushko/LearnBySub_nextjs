"use client";

import { usePathname } from "next/navigation";
import { getCleanPathname } from "../../../i18nConfig";
import { AUTH_PAGES } from "@/constants";

export default function HideOnAuthPagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const shouldShowHeader = !AUTH_PAGES.includes(getCleanPathname(path));
  return shouldShowHeader && children;
}
