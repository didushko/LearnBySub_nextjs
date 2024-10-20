"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./PaginationBar.module.css";

interface PaginationStyle {
  readonly paginationContainer: string;
  readonly activePageElement: string;
  readonly pageElement: string;
};

const PaginationBar = ({
  currentPage,
  totalPages,
  paramName = "page",
  // paginationStyle = style,
}: {
  currentPage: number;
  totalPages: number;
  paramName?: string;
  // paginationStyle: PaginationStyle
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const setParams = (value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(paramName, value.toString());
    } else {
      params.delete(paramName);
    }
    replace(`${pathName}?${params.toString()}`);
  };
  const pages = [];
  if (totalPages === 1) {
    return null;
  }
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <div
        onClick={(e) => setParams(i)}
        style={{ color: i === currentPage ? "red" : "blue" }}
      >
        {i}
      </div>
    );
  }
  return <div className={style.paginationContainer}>{pages}</div>;
};

export default PaginationBar;
