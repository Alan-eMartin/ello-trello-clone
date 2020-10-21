import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './style.scss';
// Components
import TaskCard from '../TaskCard/index';
import ButtonForm from '../ButtonForm/index'

const TaskList = (props) => {

  const { title, cards, listID } = props;

  // console.log(cards);

  return (

    <Droppable droppableId={String(listID)}>
      {provided => (
        <div 
          {...provided.droppableProps} 
          ref={provided.innerRef} 
          className="task-list-container"
        >
          <h3 className="task-list-title">
            {title}
          </h3>
          <ul className="task-list">
            {
              cards.map((card, index) => (
                <TaskCard
                  text={card.text}
                  key={card.id}
                  id={card.id}
                  index={index}
                />
              ))
            }
            {provided.placeholder}
            <ButtonForm
              listID={listID}
            />
          </ul>
        </div>
      )}
    </Droppable>

  );
}

export default TaskList;