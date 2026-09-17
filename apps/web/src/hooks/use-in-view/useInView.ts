import { useEffect, useRef, useState } from "react";

function startsVisible(): boolean {
  return (
    typeof IntersectionObserver === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState<boolean>(startsVisible);

  useEffect(() => {
    const element = ref.current;
    if (element === null || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting !== true) return;

        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}

export { useInView };
