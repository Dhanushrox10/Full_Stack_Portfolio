import { useEffect } from "react";

export default function useInView() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else if (entry.intersectionRatio === 0) {
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-20px 0px -20px 0px", // starts animation -20px before element enters viewport
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}