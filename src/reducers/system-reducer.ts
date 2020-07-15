import { ActionType, getType } from 'typesafe-actions';

import { ErrorReply, Message, Nullable } from '../.types/types';
import { systemActions } from '../actions';
import { combineReducers } from 'redux';
import { IContext } from '../models/system';

export interface ContextBaseState {
  data: Nullable<IContext>;
}
export interface LoaderBaseState extends Message {
  isLoading: boolean;
  error?: ErrorReply;
}

export interface SystemState {
  readonly loader: LoaderBaseState;
  readonly context: ContextBaseState;
};


const initialLoaderState = Object.freeze({
  message: '',
  isLoading: false,
})
const initialContextState = Object.freeze({
  data: null,
})

export type SystemAction = ActionType<typeof systemActions>;

export default combineReducers<SystemState, SystemAction>({
  loader: (state = initialLoaderState, action) => {
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
  },
  context: (state = initialContextState, action) => {
    switch (action.type) {

      case getType(systemActions.openContext):
        return { data: action.payload }

      case getType(systemActions.closeContext):
        return { data: null }

      default:
        return state;
    }
  },
})
