
export const newsActions = {
  GET_NEWS_REQUEST_START:
    '[0] @@news Request a news list.',
  GET_NEWS_REQUEST_COMPLETED:
    '[1] @@news news async service returned news.',
  CANCEL_ONGOING_NEWS_REQUEST:
    '[2] Cancelling and on going news request',
  GET_NEWS_REQUEST_USER_CONFIRMATION:
    '[3] User has to confirm or cancel the news request before it gets fired',
};

export interface BaseAction {
  type: string;
  payload?: any;
}
