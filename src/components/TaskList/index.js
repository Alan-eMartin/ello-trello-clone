import React from 'react';
import './style.scss';
// Components
import TaskCard from '../TaskCard/index';
import ButtonForm from '../ButtonForm/index'

const TaskList = (props) => {

  const { title, cards, listID } = props;

  // console.log(cards);

  return (
    <div className="task-list-container">
      <h3 className="task-list-title">
        {title}{}
      </h3>
      <ul className="task-list">
        {
          cards.map(card => (
            <TaskCard
              text={card.text}
              id={cards.map(id => (id.id))}
              autofocus
            />
          ))
        }
        <ButtonForm
          listID={listID}
        />
      </ul>
    </div>
  );
}

export default TaskList;