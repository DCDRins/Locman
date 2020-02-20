import { createStore, applyMiddleware, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { monitorReducerEnhancer } from './enhancers'
import { loggerMiddleware } from './middleware'

import rootSaga from './root-saga';
import rootReducer, { ApplicationState } from './root-reducer';


export default function configureStore(history: History, initialState?: ApplicationState): Store<ApplicationState> {
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  const middlewares = [
    loggerMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ];
  
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [
    middlewareEnhancer,
    monitorReducerEnhancer,
  ]

  // if (process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line no-underscore-dangle
  //   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  
  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension());
  //   }
  // }

  // const composedEnhancers = compose(...enhancers)
  const composedEnhancers = composeWithDevTools(...enhancers)
  
  const store = createStore(rootReducer(history), initialState, composedEnhancers)
  sagaMiddleware.run(rootSaga)
  
  return store
}
