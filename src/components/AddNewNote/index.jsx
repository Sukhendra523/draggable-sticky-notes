import React, { useState, useRef, useEffect } from "react";
import { determineNewPosition } from "../../utils";

import "./styles.scss";
import ClickAwayListener from "../../HOC/ClickAwayListener";
import { v4 as uuid } from "uuid";

const initialNewNoteData = { title: "", description: "" };

const AddNewNotes = ({ setNotes, notes }) => {
  const [newNote, setNewNote] = useState(initialNewNoteData);
  const [showTitle, setShowTitle] = useState(false);
  const addNewNoteContainerRef = useRef();
  const addNewNoteDescriptionRef = useRef();

  const onChangeHanler = (e) => {
    let changedData = { ...newNote, [e.target.name]: e.target.value };
    setNewNote(changedData);
  };
  const resizeTextArea = (e) => {
    const textAreaElement = e.target;
    const currentHeight = textAreaElement?.style.height?.replace("px", "");
    if (textAreaElement && currentHeight < 160) {
      textAreaElement.style.height = "auto";
      textAreaElement.style.height = textAreaElement?.scrollHeight + "px";
    }
  };
  useEffect(() => {
    addNewNoteDescriptionRef.current?.addEventListener("input", resizeTextArea);
    return () => {
      addNewNoteDescriptionRef.current?.removeEventListener(
        "input",
        resizeTextArea
      );
    };
  }, []);

  const resetAddNewNoteContainer = () => {
    addNewNoteContainerRef.current.style.minHeight = "16px";
    addNewNoteDescriptionRef.current.style.height = "16px";
    setShowTitle(false);
  };

  const addNewNoteHandler = () => {
    if (!(newNote.description || newNote.title)) {
      resetAddNewNoteContainer();
      return;
    }
    const { x: left, y: top } = determineNewPosition(250, 250);
    const newNoteData = {
      ...newNote,
      id: uuid(),
      top,
      left,
    };
    setNotes([...notes, newNoteData]);
    setNewNote(initialNewNoteData);
    resetAddNewNoteContainer();
  };

  const onTextAreaClickHandler = () => {
    setShowTitle(true);
    addNewNoteContainerRef.current.style.minHeight = "70px";
  };

  return (
    <ClickAwayListener onClickAway={addNewNoteHandler}>
      <div
        className="add-new-note-container"
        id="add-new-note-container"
        ref={addNewNoteContainerRef}
      >
        {showTitle && (
          <input
            id="add-new-note-title"
            value={newNote.title}
            onChange={onChangeHanler}
            name="title"
            placeholder="Note Title..."
          />
        )}
        <textarea
          id="add-new-note-description"
          type="text"
          onChange={onChangeHanler}
          value={newNote.description}
          name="description"
          placeholder="Write a note here..."
          cols={50}
          rows={1}
          className="custom-scrollbar-style-1"
          onClick={onTextAreaClickHandler}
          ref={addNewNoteDescriptionRef}
        />
      </div>
    </ClickAwayListener>
  );
};

export default AddNewNotes;
