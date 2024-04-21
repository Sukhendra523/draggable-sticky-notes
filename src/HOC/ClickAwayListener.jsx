import React, { useRef , useEffect, memo } from "react";

const ClickAwayListener = ({ elementRef, onClickAway, children }) => {
  const component = useRef();

  const handleClickAwayListener = (e) => {
    // Check if the click came from inside the click away container
    // If it did, do nothing
    if (component.current?.contains(e.target)) return;

    // Check if the click came from inside an additional node reference
    // If it did, do nothing
    if (elementRef?.current.contains(e.target)) return;

    // Otherwise, the click happened outside of the click away container
    // So lets execute the click away function
    onClickAway(e);
  };
  useEffect(() => {
    // When the component mounts, register a click event that processes the click away
    document.addEventListener("click", handleClickAwayListener);

    return () => {
      // When the component mounts, register a click event that processes the click away
      document.removeEventListener("click", handleClickAwayListener);
    };
  }, [onClickAway,elementRef]);

  return <div ref={component}>{children}</div>;
};

export default memo(ClickAwayListener);
