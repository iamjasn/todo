import React from 'react';
import ReactDOM from 'react-dom';
import TodoInput from './TodoInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoInput />, div);
  ReactDOM.unmountComponentAtNode(div);
});