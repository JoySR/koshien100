import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import makeRootReducer from './reducer'

const logger = createLogger();
const middleware = [thunk, logger]

const createStore = (initialState = {}) => {
  const enhancers = []
  let composeEnhancers = compose

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )


  // create persistor

  store.asyncReducers = {}

  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     const reducers = require('./reducers').default
  //     store.replaceReducer(reducers(store.asyncReducers))
  //   })
  // }

  return { store };

}

export default createStore
