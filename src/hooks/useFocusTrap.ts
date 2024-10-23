import { useEffect } from "react";

export const useFocusTrap = (elementIds: string[], isOpen?: boolean) => {
  useEffect(() => {
    const trapFocus = (event: KeyboardEvent) => {
      const focusableElements: HTMLElement[] = elementIds.reduce(
        (acc: HTMLElement[], id: string) => {
          const element = document.getElementById(id);
          if (element) {
            const focusables = Array.from(
              element.querySelectorAll<HTMLElement>(
                'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
              )
            );
            acc.push(...focusables);
          }
          return acc;
        },
        []
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === "Tab") {
        if (event.shiftKey) {
          // Якщо Shift + Tab і фокус на першому елементі, переміщаємо на останній
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Якщо Tab і фокус на останньому елементі, переміщаємо на перший
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    if (isOpen !== undefined) {
      if (isOpen) {
        document.addEventListener("keydown", trapFocus);
      } else {
        document.removeEventListener("keydown", trapFocus);
      }
    } else {
      document.addEventListener("keydown", trapFocus);
    }

    return () => {
      document.removeEventListener("keydown", trapFocus);
    };
  }, [elementIds, isOpen]);
};
