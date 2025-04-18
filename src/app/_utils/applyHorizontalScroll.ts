export const applyHorizontalScroll = (
  ref: React.RefObject<HTMLElement>,
  options: {
    width?: string;
    height?: string;
    speed?: number;
  } = {}
) => {
  const { width = "860px", height = "650px", speed = 2 } = options;

  let cleanup: (() => void) | undefined;

  const apply = () => {
    const el = ref.current;
    if (!el) return;

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

    cleanup = () => {
      el.removeEventListener("wheel", handleWheel);
    };
  };

  // DOM이 완전히 렌더된 뒤 적용되도록 지연
  const frameId = requestAnimationFrame(() => {
    setTimeout(apply, 10); // setTimeout이 없으면 너무 빨라서 ref가 null일 수 있음
  });

  return () => {
    cancelAnimationFrame(frameId);
    if (cleanup) cleanup();
  };
};
