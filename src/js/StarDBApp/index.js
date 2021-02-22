import App from './components/app';
import ReactDOM from 'react-dom';
import React from 'react';

document.body.querySelector('.starDBApp') ? ReactDOM.render(<App/>, document.body.querySelector('.starDBApp')) : '';
//ReactDOM.render(<App/>, document.body.querySelector('.starDBApp'));