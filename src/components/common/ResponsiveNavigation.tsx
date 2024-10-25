"use client";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import style from "./ResponsiveNavigation.module.css";
import { getCleanPathname } from "../../../i18nConfig";
import INavigate from "./ResponsiveNavigation.types";

function ResponsiveNavigation({
  loadingClassName,
  mode = "full",
  around = false,
  fullOnMobile = true,
  route = "push",
  scroll = true,
  path,
  updateParams,
  blure = false,
  selectedClassName,
  ...buttonProps
}: INavigate) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    initPath?: string;
  }>({ isLoading: false, initPath: undefined });

  const predicate = useMemo(
    () =>
      getPredicate(
        path || false,
        updateParams || false,
        pathName,
        searchParams
      ),
    [path, updateParams, searchParams]
  );

  const newPath = useMemo(
    () =>
      getNewPath(path || false, updateParams || false, pathName, searchParams),
    [path, updateParams]
  );
  const loadingClass = useMemo(() => {
    return getLoadingClassName(
      mode,
      fullOnMobile,
      around,
      loadingClassName,
      blure
    );
  }, [mode, fullOnMobile, around, loadingClassName]);

  const combainedClassName = function () {
    const selected = `${
      selectedClassName && predicate ? " " + selectedClassName : ""
    }`;
    const loading = loadingState.isLoading ? " " + loadingClass : "";

    return `${buttonProps.className || ""}${selected}${loading}`;
  };

  const handleClick = () => {
    if (route === "refresh") {
      setLoadingState({ isLoading: true, initPath: pathName });
      window.location.reload();
    }
    if (!predicate) {
      setLoadingState({ isLoading: true, initPath: pathName });
      if (route === "replace") {
        router.replace(newPath, { scroll });
      } else {
        router.push(newPath, { scroll });
      }
    }
  };

  useEffect(() => {
    // if (buttonProps.test) {
    //   setLoadingState({ isLoading: true });
    // }
    if (predicate || pathName !== loadingState.initPath) {
      setLoadingState({ isLoading: false });
    }
  }, [pathName, searchParams]);

  return (
    <button
      {...buttonProps}
      className={combainedClassName()}
      onClick={handleClick}
    >
      {buttonProps.children}
    </button>
  );
}

export default ResponsiveNavigation;

function getPredicate(
  path: string | false,
  updateParams: INavigate["updateParams"] | false,
  pathName: string,
  searchParams: URLSearchParams
): boolean {
  if (path) {
    const currentPath =
      getCleanPathname(pathName) +
      (searchParams.toString() ? "?" + searchParams.toString() : "");
    return currentPath === getCleanPathname(path);
  }
  if (updateParams) {
    return Object.entries(updateParams).every(
      ([key, value]) => searchParams.get(key) === value
    );
  }
  return true;
}

function getNewPath(
  path: string | false,
  updateParams: INavigate["updateParams"] | false,
  pathName: string,
  searchParams: URLSearchParams
): string {
  if (path) {
    return path;
  }
  if (updateParams) {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updateParams).forEach(([key, value]) => {
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    const stringParams = newParams.toString();
    return `${pathName}${stringParams ? "?" + stringParams : ""}`;
  }
  return pathName;
}

function getLoadingClassName(
  mode: INavigate["mode"],
  fullOnMobile: boolean,
  around: boolean,
  loadingClassName?: string,
  blure?: boolean
): string {
  if (mode === "custom") {
    return loadingClassName || "";
  }
  const backgroundClass = fullOnMobile ? " " + style.mobile : "";
  const aroundClass =
    mode === "hoverWidth" || mode === "hoverHeight"
      ? " " + style[mode.replace("hover", "around")]
      : "";
  const loadingClass = ` ${style[mode]}${around ? aroundClass : ""}`;
  const blureClass = blure ? " " + style.blure : "";

  return `${backgroundClass}${loadingClass}${blureClass}`;
}
