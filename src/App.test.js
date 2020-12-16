import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const store = createStore(rootReducer);

test('renders Routes', () => {
  const root=document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>,root)
});
