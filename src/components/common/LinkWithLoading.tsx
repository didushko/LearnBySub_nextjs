"use client";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import style from "./LinkWithLoading.module.css";
import { getCleanPathname } from "../../../i18nConfig";

interface LinkProps extends React.ComponentProps<typeof Link> {
  children: ReactNode;
  loadingClassName?: string;
  mode?: "full" | "hover-width" | "hover-height" | "border" | "custom";
  fullOnMobile?: boolean;
}

const LinkWithLoading: React.FC<LinkProps> = ({
  children,
  loadingClassName,
  mode = "full",
  fullOnMobile = true,
  ...linkProps
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const currentPath =
    getCleanPathname(pathname) +
    (searchParams.toString() ? "?" + searchParams.toString() : "");
  const targetPath = linkProps.href.toString();

  const handleClick = () => {
    if (currentPath !== targetPath) setIsLoading(true);
  };

  useEffect(() => {
    const targetPath = linkProps.href.toString();
    const params = searchParams.toString();
    const currentPath =
      getCleanPathname(pathname) + (params ? "?" + params : "");
    const isSamePage = currentPath === targetPath;
    if (isSamePage) {
      setIsLoading(false);
    }
  }, [pathname, searchParams, linkProps.href]);

  if (mode === "full") {
    return (
      <div
        onClick={handleClick}
        className={isLoading && fullOnMobile ? style.mobileBackground : ""}
      >
        {isLoading && <div className={style.full} />}
        <Link {...linkProps}>{children}</Link>
      </div>
    );
  }

  if (mode === "hover-width" || mode === "hover-height") {
    return (
      <div
        onClick={handleClick}
        className={isLoading && fullOnMobile ? style.mobileBackground : ""}
        style={{
          position: "relative",
        }}
      >
        {isLoading && (
          <div
            className={`${fullOnMobile ? style.mobile : ""} ${
              mode === "hover-width" ? style.hoverWidth : style.hoverHeight
            }`}
          />
        )}
        <Link {...linkProps}>{children}</Link>
      </div>
    );
  }

  if (mode === "border") {
    return (
      <div
        onClick={handleClick}
        className={isLoading && fullOnMobile ? style.mobileBackground : ""}
      >
        <div
          className={
            isLoading
              ? `${style.border} ${fullOnMobile ? style.mobile : ""}`
              : ""
          }
        >
          <Link {...linkProps}>{children}</Link>
        </div>
      </div>
    );
  }
  if (mode === "custom" && loadingClassName) {
    return (
      <div onClick={handleClick} className={isLoading ? loadingClassName : ""}>
        <Link {...linkProps}>{children}</Link>
      </div>
    );
  }
  return <Link {...linkProps}>{children}</Link>;
};

export default LinkWithLoading;
