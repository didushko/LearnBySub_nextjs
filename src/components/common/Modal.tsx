"use client";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import React from "react";
import styles from "./Modal.module.css";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface IModal {
  children?: React.ReactNode;
  visible?: boolean;
  dropCallback?: Function;
  backdropeStyleClass?: string;
  addIdToFocus?: string[];
}

const Modal = ({
  children,
  visible = false,
  dropCallback,
  backdropeStyleClass,
  addIdToFocus,
  ...rest
}: IModal &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
  const [mounted, setMounted] = useState(false);
  useFocusTrap(["modalContent", ...(addIdToFocus || [])], mounted);

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
    if (dropCallback) {
      dropCallback();
    } else {
      setMounted(false);
    }
  };

  if (!backdropeStyleClass) {
    backdropeStyleClass = styles.defaultBackdrop;
  }

  if (mounted && visible) {
    return createPortal(
      <div {...rest}>
        <div className={backdropeStyleClass} onClick={backDropHandle}>
          <div
            id="modalContent"
            onKeyUp={(e) => {
              console.log("ads");
              if (e.key == "Escape") {
                backDropHandle();
              }
            }}
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>,
      document?.body
    );
  }
  return null;
};

export default Modal;
