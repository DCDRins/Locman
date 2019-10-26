// ./src/store/chat/actions.ts

import { ActionCreator } from 'redux';
import {
  NewsState,
  NewsTemplate,
  OrganizationInfo,
  NewsListRequestedAction,
  NewsListDeletedAction,
} from './types';

// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const getNewsList: ActionCreator<NewsListRequestedAction> = (news: NewsState) => ({
  type: '@@news/NEWS_LIST_REQUESTED',
  payload: {
    news,
  },
});

export const deleteNewsList: ActionCreator<NewsListDeletedAction> = (message: string) => ({
  type: '@@news/NEWS_LIST_DELETE',
  payload: {
    message,
  },
});
