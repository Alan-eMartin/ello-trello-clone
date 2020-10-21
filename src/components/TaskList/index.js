import React from 'react';
import './style.scss';
// Components
import TaskCard from '../TaskCard/index';
import ButtonForm from '../ButtonForm/index'

const TaskList = (props) => {

  const { title, cards } = props;

  return (
    <div className="task-list-container">
      <h3 className="task-list-title">
        {title}
      </h3>
      <ul className="task-list">
        {
          cards.map(card => (
            <TaskCard
              text={card.text}
              id={cards.id}
              autofocus
            />
          ))
        }
        <ButtonForm />
      </ul>
    </div>
  );
}

export default TaskList;