import { useEffect, RefObject, MutableRefObject } from "react";

export const useDetectOutsideClick = (
  ref: RefObject<HTMLElement> | MutableRefObject<undefined>,
  callback: () => void
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
