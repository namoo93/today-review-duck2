import { useEffect, RefObject } from "react";

type ScrollOptions = {
  width?: string;
  height?: string;
  speed?: number;
};

export const useHorizontalScroll = (
  ref: RefObject<HTMLElement>,
  options: ScrollOptions = {}
) => {
  const { width = "860px", height = "650px", speed = 2 } = options;

  useEffect(() => {
    let frameId: number;

    const applyScrollStyles = () => {
      const el = ref.current;
      if (!el) {
        frameId = requestAnimationFrame(applyScrollStyles);
        return;
      }

      // 필수 스타일 적용
      Object.assign(el.style, {
        width,
        height,
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        whiteSpace: "nowrap",
        scrollBehavior: "smooth",
      });

      const handleWheel = (e: WheelEvent) => {
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * speed;
        }
      };

      el.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        el.removeEventListener("wheel", handleWheel);
        cancelAnimationFrame(frameId);
      };
    };

    frameId = requestAnimationFrame(applyScrollStyles);

    return () => cancelAnimationFrame(frameId);
  }, [ref, width, height, speed]);
};
