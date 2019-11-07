// ./src/store/index.ts

// import { routerReducer } from 'react-router-redux';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';

// // Import state types and reducers here.
// import { NewsState } from '../store/news/types';
// import newsReducer from '../store/news/reducer';



// export const rootReducer: Reducer<ApplicationState> = (history: History) => combineReducers<ApplicationState>({
  //   router: connectRouter(history),
  //   news: newsReducer,
  // });
  
  
import { combineReducers, Dispatch, Reducer } from 'redux';
import { History } from 'history';

import { connectRouter, RouterState } from 'connected-react-router';

import { NewsState } from '../store/news/types';

import newsReducer from '../store/news/reducer';

export interface ApplicationState {
  router: RouterState;
  news: NewsState;
  // userData: string;
}

export default (history: History): Reducer<ApplicationState> => combineReducers({
  router: connectRouter(history),
  news: newsReducer,
  // userData: {};
});
