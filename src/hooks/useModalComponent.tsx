"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "@/components/common/Modal";

const useModalComponent = (nonDropClass?: string, defultVisible?: boolean) => {
  const [modalVisible, setModalVisible] = useState(defultVisible || false);
  if (!nonDropClass) {
    nonDropClass = "nonDropClassUseModalComponent";
  }
  const dropCallback = useRef<Function>();
  const newDropCallback = () => {
    setModalVisible(false);
    if (dropCallback.current) {
      dropCallback.current();
    }
  };
  useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest("." + nonDropClass)) {
        newDropCallback();
      }
    };
    if (nonDropClass && modalVisible) {
      setTimeout(
        () => window.addEventListener("click", handleClick, true),
        200
      );
    }
    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, [modalVisible, nonDropClass]);

  const ModalComponent = useCallback(
    (props: React.ComponentProps<typeof Modal>) => {
      dropCallback.current = props.dropCallback;
      return (
        <Modal
          visible={modalVisible}
          tabIndex={0}
          onKeyUp={(e) => {
            if (e.key == "Escape") {
              setModalVisible(false);
            }
          }}
          {...props}
          dropCallback={nonDropClass ? undefined : newDropCallback}
        >
          {nonDropClass ? (
            <div className={nonDropClass} style={{ display: "contents" }}>
              {props.children}
            </div>
          ) : (
            props.children
          )}
        </Modal>
      );
    },
    [dropCallback, nonDropClass, modalVisible]
  );

  return {
    setModalVisible,
    ModalComponent: ModalComponent,
    nonDropClass,
    modalVisible,
  };
};

export default useModalComponent;
