"use client";
import React, { useRef, useEffect, useState } from "react";
import styles from "./TruncatedText.module.css";

interface TruncatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top" | "left" | "right" | "bottom";
  children: string | string[] | number | undefined;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  position = "top",
  children,
  ...rest
}) => {
  const [truncated, setTruncated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setTruncated(container.scrollWidth > container.clientWidth);
    }
  }, [children, truncated, containerRef]);

  if (!children) return null;
  return (
    <div
      className={
        styles.title + (show ? ` ${styles.trancated} ${styles[position]}` : "")
      }
      {...(truncated
        ? {
            onMouseEnter: () => {
              if (truncated) setTimer(setTimeout(() => setShow(true), 500));
            },
            onMouseLeave: () => {
              if (truncated) {
                if (timer) {
                  clearTimeout(timer);
                  setTimer(undefined);
                }
                setShow(false);
              }
            },
          }
        : {})}
      data-text={truncated ? children.toString() : undefined}
      {...rest}
    >
      <div ref={containerRef} className={styles.text}>
        {children}
      </div>
    </div>
  );
};

export default TruncatedText;
