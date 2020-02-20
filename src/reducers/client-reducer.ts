import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { AuthResponse } from '../models';
import { clientActions } from '../actions';

export type ClientState = {
  readonly auth: {
    data?: AuthResponse;
    isLoading: boolean;
  };
};

const initialState = Object.freeze({
  isLoading: false,
})

export type ClientAction = ActionType<typeof clientActions>;

export default combineReducers<ClientState, ClientAction>({
  auth: (state = initialState, action) => {
    switch (action.type) {
      case getType(clientActions.authAsync.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      default:
        return state;
    }
  },
});

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));