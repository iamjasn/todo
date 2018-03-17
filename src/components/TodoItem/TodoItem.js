import React from 'react';
import './TodoItem.css';

const TodoItem = (props) => {
  const { markAs, id, completed, text } = props;

  function handleChange(e) {
    markAs && markAs(id, !completed);
  }

  return (
    <li className={"todo-item-container " + (completed ? 'completed' : '')}>
      <input
        type="checkbox"
        id={id}
        defaultChecked={completed}
        onChange={handleChange}
        value={completed}
      />
      <label htmlFor="{id}">
        {text}
      </label>
    </li>
  );
};

export default TodoItem;