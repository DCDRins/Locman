// ./src/store/news/types.ts

import { Action } from 'redux';

export interface NewsState {
  news: NewsTemplate[];
}

// Feel free to include more types for good measure.

export interface NewsTemplate {
  id: number;
  title: string;
  anons: string;
  availability: boolean;
  text: string;
  image?: string;
  previewImage?: string;
  activeStart: Date;
  activeEnd: Date;
  creator: OrganizationInfo;
}
export interface OrganizationInfo {
  id: number;
  name: string;
}


// Declare our action types using our interface. For a better debugging experience,
// I use the `@@context/ACTION_TYPE` convention for naming action types.

export interface NewsListRequestedAction extends Action {
  type: '@@news/NEWS_LIST_REQUESTED';
  payload: {
    news: NewsState;
  };
}
export interface NewsListDeletedAction extends Action {
  type: '@@news/NEWS_LIST_DELETE';
  payload: {
    message: string;
  };
}

// export type NewsActions = NewsListRequestedAction | MessageReceivedAction;
export type NewsActions = NewsListRequestedAction | NewsListDeletedAction;