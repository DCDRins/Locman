import { ActionType, getType } from 'typesafe-actions';

import { ErrorReply, Message } from '../.types/types';
import { systemActions } from '../actions';

export type SystemState = Message & {
  isLoading: boolean;
  error?: ErrorReply;
};

const initialState = Object.freeze({
  message: '',
  isLoading: false,
})

export type SystemAction = ActionType<typeof systemActions>;

export default (state: SystemState = initialState, action: SystemAction) => {
  switch (action.type) {
    case getType(systemActions.somethingIsLoading):
      return {
        ...state,
        message: undefined,
        isLoading: true,
        error: undefined,
      }
    case getType(systemActions.somethingIsSuccessfullyLoaded):
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      }
    case getType(systemActions.somethingIsThrowException):
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}
