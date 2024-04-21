import { useEffect, useLayoutEffect, useRef } from "react";

export function useClickAway(cb) {
    const ref = useRef(null);
    const refCb = useRef(cb);
  
    useLayoutEffect(() => {
      refCb.current = cb;
    });
  
    useEffect(() => {
      const handler = (e) => {
        const element = ref.current;
        if (element && !element.contains(e.target)) {
          refCb.current(e);
        }
      };
  
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
  
      return () => {
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
      };
    }, []);
  
    return ref;
  }