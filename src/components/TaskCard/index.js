import React from 'react';
import './style.scss';

const TaskCard = (props) => {

  // Props
  const { text, id } = props;
  
  return (
    <li 
      className="task-card"
      key={id}
    >
      {`${text}`}
    </li>
  );
}

export default TaskCard; 