import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/todo-app';

document.querySelector('.udemy-first-step') ? ReactDOM.render(<App/>, document.querySelector('.udemy-first-step')) : '';

