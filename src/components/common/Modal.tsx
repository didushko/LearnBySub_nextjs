"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./Modal.module.css";

interface IModal {
  children?: React.ReactNode;
  visible?: boolean;
  dropCallback?: Function;
  backdropeStyleClass?: string;
}

const Modal = ({
  children,
  visible = false,
  dropCallback,
  backdropeStyleClass,
  ...rest
}: IModal &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const rootStyle = document.body.style!;
    if (visible) {
      rootStyle.overflow = "hidden";
    }
    return () => {
      rootStyle.overflow = "auto";
    };
  }, [visible]);

  const backDropHandle = () => {
    if (dropCallback) dropCallback();
  };

  if (!backdropeStyleClass) {
    backdropeStyleClass = styles.defaultBackdrop;
  }

  if (mounted && visible) {
    return createPortal(
      <div {...rest}>
        <div className={backdropeStyleClass}>
          <div className={styles.modalBackdrop} onClick={backDropHandle}></div>
        </div>
        <div className={backdropeStyleClass}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>,
      document?.body
    );
  }
  return null;
};

export default Modal;
