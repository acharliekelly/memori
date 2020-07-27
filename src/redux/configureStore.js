import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunkMiddleware } from 'redux-thunk';

import logger from './middleware/logger';
import monitorReducerEnhancer from './middleware/monitorReducer';
import reducer from './reducers/';

export default function configureStore(preloadedState) {
  const middlewares = [logger, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(...enhancers)  
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducer));
  }

  return store;
};
