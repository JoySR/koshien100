import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import {Provider} from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore({}).store;

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  MOUNT_NODE
);

registerServiceWorker();
