import React, { Component } from 'react';
import { get, post } from 'axios';
import * as qs from 'qs';

import TodoInput from './components/TodoInput/TodoInput';
import TodoItem from './components/TodoItem/TodoItem';

import { EMAIL, API_URLS } from './todoConstants';

import './TodoApp.css';

const CONTENT_TYPE = { 'Content-Type': 'application/x-www-form-urlencoded' };

class TodoApp extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false,
      isLoading: true,
      todos: []
    }
  }

  componentDidMount() {
    get(API_URLS.getTodos)
      .then((response) => {
        this.setState({
          isLoading: false,
          todos: response.data
        });
      })
      .catch(error => this.showError());
  }
  addTodo = (input) => {
    const data = qs.stringify({ email: EMAIL, text: input.value });

    post(API_URLS.addTodo, data, CONTENT_TYPE)
      .then((response) => {
        this.setState({
          todos: [ response.data, ...this.state.todos ]
        });
      })
      .catch(error => this.showError());

    // clear the input
    input.value = null;
  }

  markAs = (id, value) => {
    const data = qs.stringify({ id, email: EMAIL, completed: value });

    post(API_URLS.markTodo, data, CONTENT_TYPE)
      .then((response) => {
        const updatedTodo = { ...response.data, id: parseInt(response.data.id, 10) };
        const updatedTodos = this.state.todos.map(item =>
          item.id === updatedTodo.id ? updatedTodo : item
        );
        this.setState({ todos: updatedTodos });
      })
      .catch(error => this.showError());
  }

  showError() {
    this.setState({ hasError: true });
    // hide the error after 3 seconds
    setTimeout(() => {this.setState({ hasError: false })}, 3000);
  }

  render() {
    const { todos, isLoading, hasError } = this.state;

    return (
      <main className="todo-container">
        {hasError && <p className="todo-error-message">An error occurred.</p>}

        <TodoInput addTodo={this.addTodo} />

        {!!todos.length &&
          <ul className="todo-list">
            {todos.map(todo =>
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                markAs={this.markAs}
              />
            )}
          </ul>
        }

        {isLoading && <p className="todo-loading-message">Loading to do list&hellip;</p>}

        {!isLoading && !todos.length && <p className="todo-empty-message">No todo items</p>}
      </main>
    );
  }
}

export default TodoApp;
