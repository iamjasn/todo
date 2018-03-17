import React from 'react';
import './TodoInput.css';

const TodoInput = ({ addTodo }) => {
  let input;

  const setInput = node => input = node;

  function handleSubmit(e) {
    e.preventDefault();

    addTodo && addTodo(input);
  }

  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input className="todo-form-input" ref={setInput} placeholder="Add a to do&hellip;" />
        <button className="todo-form-button" type="submit">
          Add to do
        </button>
      </form>
    </div>
  );
};

export default TodoInput;