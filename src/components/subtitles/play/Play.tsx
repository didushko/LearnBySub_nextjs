"use client";

import Modal from "@/components/common/Modal";
import { Suspense } from "react";
import style from "./Play.module.css";
import { IIdiom, IPhrase, IWord } from "@/database/models/subStore-model";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  IIdiomWithRate,
  IPhraseWithRate,
  IWordWithRate,
} from "@/services/subStore-service";

export default function Play({
  data,
}: {
  data: IWordWithRate[] | IIdiomWithRate[] | IPhraseWithRate[];
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
      <div className={style.content}>
        {data?.map((el) => (
          <div key={el.value}>
            <div>{el.value}</div>
            <div>{el.type !== "word" ? el.definitions : el.freq}</div>
            <br></br>
          </div>
        ))}
      </div>
    </Modal>
  );
}
