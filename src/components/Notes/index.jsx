import React, { useEffect, useState } from "react";
import Note from "./Note";
import "./styles.scss";
import AddNewNotes from "../AddNewNote";
import { isElementsOverlapping, isOverlappingOtherNote } from "../../utils";


const Notes = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || "[]")
  );
  const [offset, setOffset] = useState({ x: 0, y: 0 });


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleDrop = (event) => {
    event.preventDefault();

    const selectedElementId = event.dataTransfer.getData("id");
    const selectedElement = document
      .getElementById(selectedElementId)
      .getBoundingClientRect();

    const newTop = event.clientY - offset.y;
    const newLeft = event.clientX - offset.x;
    const newBottom = newTop + selectedElement.height;
    const newRight = newLeft + selectedElement.width;
    const newPos = {
      top: newTop,
      bottom: newBottom,
      left: newLeft,
      right: newRight,
    };

    const addNewNotecontainer = document
      .getElementById("add-new-note-container")
      .getBoundingClientRect();

    //   is overlapping with add-new-note-container
    const isOverlapWithAddNewNoteContainer = isElementsOverlapping(
      newPos,
      addNewNotecontainer
    );
    const isOverlap =
      isOverlappingOtherNote(newPos, selectedElementId, notes) ||
      isOverlapWithAddNewNoteContainer;

    if (!isOverlap) {
      const updatedNotes = notes.map((note) => {
        if (note.id == selectedElementId) {
          return { ...note, top: newPos.top, left: newPos.left };
        }
        return note;
      });

      setNotes(updatedNotes);
    }
  };

  return (
    <>
      <AddNewNotes setNotes={setNotes} notes={notes}/>
      <div
        className="notes"
        id="drop-container"
        style={{ width: "100vw", height: "100vh" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {notes.map((note) => (
          <div key={note.id}>
            <Note setOffset={setOffset} {...note} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
