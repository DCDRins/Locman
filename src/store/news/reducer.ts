// ./src/store/chat/reducer.ts
import { BaseAction, newsActions } from '../../common';
import { Reducer } from 'redux';
import { NewsState, NewsActions, NewsTemplate } from './types';

// Type-safe initialState!
export const initialState: NewsState = {
  news: [],
}

// Unfortunately, typing of the `action` parameter seems to be broken at the moment.
// This should be fixed in Redux 4.x, but for now, just augment your types.

const reducer: Reducer<NewsState> = (state: NewsState = initialState, action: BaseAction) => {
  // We'll augment the action type on the switch case to make sure we have
  // all the cases handled.
  switch ((action as NewsActions).type) {
    case '@@news/NEWS_LIST_REQUESTED':
      return { ...state, news: action.payload };
    case '@@news/NEWS_LIST_DELETE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default reducer;