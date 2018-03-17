import React, { Component } from 'react';
import { get, post } from 'axios';
import * as qs from 'qs';

import TodoInput from './components/TodoInput/TodoInput';
import TodoItem from './components/TodoItem/TodoItem';

import { EMAIL, API_URLS } from './todoConstants';

import './TodoApp.css';

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
    post(
      API_URLS.addTodo,
      qs.stringify({ email: EMAIL, text: input.value }),
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    )
      .then((response) => {
        this.setState({
          todos: [...this.state.todos, response.data]
        });
      })
      .catch(error => this.showError());

    // clear the input
    input.value = null;
  }

  markAs = (id, value) => {
    const data = qs.stringify({
      email: EMAIL,
      id,
      completed: value,
    });

    post(API_URLS.markTodo, data)
      .then((response) => {
        const updatedTodo = { ...response.data, id: parseInt(response.data.id, 10) };
        const updatedTodos = this.state.todos.map(item =>
          item.id === updatedTodo.id ? updatedTodo : item
        );
        this.setState({ todos: updatedTodos });
      })
  }

  showError() {
    console.log('an error');
    this.setState({ hasError: true });
    // hide the error after 2 seconds
    setTimeout(() => {this.setState({ hasError: false })}, 2000);
  }

  render() {
    const { todos, isLoading, hasError } = this.state;

    return (
      <main className="container--main">
        <TodoInput addTodo={this.addTodo} />

        {hasError && <p>An error occurred.</p>}

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

        {isLoading && <p className="loading-message">Loading to do list&hellip;</p>}

        {!isLoading && !todos.length && <p>No todo items</p>}
      </main>
    );
  }
}

export default TodoApp;
