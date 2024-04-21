import React, { useRef } from "react";
import {
  determineNewPosition
} from "../../utils";

const Note = ({title, description, id, top, left,setOffset, ...props }) => {
  const noteRef = useRef();

  const handleDragStart = (event) => {
    event.dataTransfer.setData("id", event.target.id);
    event.dataTransfer.effectAllowed = "move";

    const rect = event.target.getBoundingClientRect();

    const offsetX = event.clientX - rect.x;
    const offsetY = event.clientY - rect.y;
    setOffset({x:offsetX,y:offsetY});
  };


  return (
    <div
      id={id}
      ref={noteRef}
      className="note"
      style={{
        top:  top + "px",
        left: left + "px"
      }}
      draggable={true}
      onDragStart={handleDragStart}
      {...props}
    >
      📌
      <div className="note__title">{title}</div>
      <div className="note__description">
         {description}
      </div>
    </div>
  );
};

export default Note;
