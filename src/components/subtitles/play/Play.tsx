"use client";

import Modal from "@/components/common/Modal";
import { Suspense } from "react";
import style from "./Play.module.css";
import { IIdiom, IPhrase, IWord } from "@/database/models/subCash-model";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Play({
  data,
}: {
  data?: IWord[] | IIdiom[] | IPhrase[];
}) {
  const pathName = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const exit = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("showModal");
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <Suspense fallback={<div>loading</div>}>
      <Modal
        visible={true}
        tabIndex={2}
        autoFocus={true}
        backdropeStyleClass={style.backdrop}
        onKeyUp={(e) => {
          if (e.key == "Escape") {
            exit();
          }
        }}
        dropCallback={() => exit()}
      >
        <div className={style.content}>{data?.length}</div>
      </Modal>
    </Suspense>
  );
}
