// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import ReactDOM from 'react-dom';
import React from 'react';

import Component from './components/App.jsx';
// import { Provider } from 'react-redux';
// import store from './store';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// ReactDOM.render(
//   <Provider store={store}>
//     <Component />
//   </Provider>,
//   document.querySelector('#chat'),
// );
ReactDOM.render(
  <Component />,
  document.querySelector('#chat'),
);

console.log('it works!');
