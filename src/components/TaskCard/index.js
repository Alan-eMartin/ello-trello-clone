import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './style.scss';

const TaskCard = (props) => {

  // Props
  const { text, id, index } = props;
  
  return (
    <Draggable 
      draggableId={String(id)} 
      index={index}
    >
    {
      provided => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-card"
          key={id}
        >
          {`${text}`}
        </li>
      )
    }
   </Draggable> 
  );
}

export default TaskCard; 