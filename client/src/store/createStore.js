import {applyMiddleware, compose, createStore as createReduxStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import makeRootReducer from './reducer';

const logger = createLogger();
const middlewares = [thunk];

// 使用 redux-devtools-extension，fallback 到 redux-logger
// eslint-disable-next-line no-underscore-dangle
if (typeof window !== 'undefined' && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlewares.push(logger);
}

const createStore = (initialState = {}) => {
  const enhancers = [];

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
  );

  // create persistor

  store.asyncReducers = {};

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default
  //     store.replaceReducer(reducers(store.asyncReducers))
  //   })
  // }

  return {store};
};

export default createStore;
