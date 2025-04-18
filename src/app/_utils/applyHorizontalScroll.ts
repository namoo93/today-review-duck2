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

  // ref.current가 생길 때까지 기다림
  let frameId: number;
  const waitForRef = () => {
    if (ref.current) {
      apply();
    } else {
      frameId = requestAnimationFrame(waitForRef);
    }
  };
  frameId = requestAnimationFrame(waitForRef);

  return () => {
    cancelAnimationFrame(frameId);
    if (cleanup) cleanup();
  };
};
