"use client";

import { usePathname } from "next/navigation";

const hideRoutes = ["/signin"];

export default function ShowOnAuthPagesWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const shouldShowHeader = !hideRoutes.includes(path);
  return shouldShowHeader ? children : null;
}
