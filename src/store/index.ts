import { combineReducers, Reducer } from 'redux';
import { History } from 'history';

import { connectRouter, RouterState } from 'connected-react-router';

// import { NewsState } from '../store/news/types';

// import newsReducer from '../store/news/reducer';

export interface ApplicationState {
  router: RouterState;
  // news: NewsState;
}

export default (history: History): Reducer<ApplicationState> => combineReducers({
  router: connectRouter(history),
  // news: newsReducer,
});
