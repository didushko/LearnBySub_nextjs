import { useEffect } from "react";

export function useFocusTrap(className: string, deps: any[]): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Знайти всі елементи з вказаним класом
      const containers = document.querySelectorAll(`.${className}`);
      containers.forEach((container) => {
        const focusableElements = container.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === "Tab") {
          if (event.shiftKey) {
            // Якщо натиснуто Shift+Tab і фокус на першому елементі
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Якщо натиснуто Tab і фокус на останньому елементі
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      });
    };

    // Додаємо слухача подій до документа
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      // Видаляємо слухача подій при демонтуванні
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [className, ...deps]); // Виконуємо при зміні className
}
