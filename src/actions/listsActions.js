import { CONSTANTS } from '../actions' 

// Add New List Action
export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  }
}

// Drag N Drop Action
export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
    }
  }
}