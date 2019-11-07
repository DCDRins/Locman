
export interface ActionDictionary {
  [id: string]: string;
}

export interface BaseAction {
  type: string;
  payload?: any;
  meta?: any;
}

export const newsActions: ActionDictionary = {
  GET_NEWS_REQUEST_START:
    '@@news - Request a news list.',
  GET_NEWS_REQUEST_COMPLETED:
    '@@news async service returned news.',
  CANCEL_ONGOING_NEWS_REQUEST:
    '@@news Cancelling and on going news request',
};
