import { useEffect, useRef } from "react";
import { SCROLL_PERCENT } from "./constants";

export function useInfiniteScroll(callback: () => void, skip: boolean) {
  const locked = useRef(false);

  useEffect(() => {
    function handleScroll() {
      if (skip || locked.current) {
        return;
      }

      locked.current = true;

      const { innerHeight, scrollY } = window;
      const { scrollHeight } = document.documentElement;

      const scrollRatio = (scrollY + innerHeight) / scrollHeight;

      if (scrollRatio < SCROLL_PERCENT) {
        return;
      }

      callback();

      setTimeout(() => {
        locked.current = false;
      }, 300);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, skip]);
}
