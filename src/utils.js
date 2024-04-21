export const determineNewPosition = (elementWidth, elementHeight ) => {
    const maxX = window.innerWidth - elementWidth;
    const maxY = window.innerHeight - elementHeight;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

export  const isElementsOverlapping = (firstElement, secondElement) => {
  const overlapping = !(
    firstElement.right < secondElement.left ||
    firstElement.left > secondElement.right ||
    firstElement.bottom < secondElement.top ||
    firstElement.top > secondElement.bottom
  );

  return overlapping;
};


export const isOverlappingOtherNote = (
  newPositionOfSelectedNote,
  selectedNoteId,
  OtherNotes
) => {
  return OtherNotes.some((note) => {
    if (note.id == selectedNoteId) return false;

    const otherNoteElement = document.getElementById(note.id);
    const otherNotePosition = otherNoteElement.getBoundingClientRect();

    return isElementsOverlapping(
      newPositionOfSelectedNote,
      otherNotePosition
    );
  });
};