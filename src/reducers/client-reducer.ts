import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { AuthResponse, IUserDTO } from '../models';
import { Message, Nullable, ErrorReply } from '../.types/types';
import { clientActions } from '../actions';
import { user } from '../services/api';

export interface UserState {
  user: Nullable<IUserDTO>;
  userList?: Nullable<IUserDTO[]>;
  isUserLoading: boolean;
  userError?: Nullable<Message>;
}
export interface AuthState {
  data?: AuthResponse;
  isLoading: boolean;
  error?: ErrorReply;
}
export type ClientState = {
  readonly auth: AuthState;
  readonly user: UserState;
};

export const initialAuthState = Object.freeze({
  isLoading: false,
})
export const initialUserState = Object.freeze({
  user: null,
  userError: null,
  userList: null,
  isUserLoading: true,
})

export type ClientAction = ActionType<typeof clientActions>;

export default combineReducers<ClientState, ClientAction>({
  auth: (state = initialAuthState, action) => {
    switch (action.type) {
      case getType(clientActions.authAsync.request):
        return initialAuthState;
      case getType(clientActions.authAsync.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      case getType(clientActions.authAsync.failure):
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        }
      default:
        return state;
    }
  },
  user: (state = initialUserState, action) => {
    switch (action.type) {
      case getType(clientActions.fetchUserData.request):
        return {
          ...state,
          isUserLoading: true,
          userError: null,
        };
      case getType(clientActions.fetchUserData.success):
        return {
          ...state,
          user: action.payload,
          isUserLoading: false,
        }
      case getType(clientActions.fetchUserData.failure):
        return {
          ...state,
          isUserLoading: false,
          userError: action.payload,
        }
      case getType(clientActions.editUserData.request):
        return {
          ...state,
          userError: null,
        };
      case getType(clientActions.editUserData.success):
        return {
          ...state,
        }
      case getType(clientActions.editUserData.failure):
        return {
          ...state,
          userError: action.payload,
        }
      case getType(clientActions.uploadUserImage.request):
        return {
          ...state,
          userError: null,
        };
      case getType(clientActions.uploadUserImage.success):
        return {
          ...state,
          user: state.user && {
            ...state.user,
            photo: action.payload,
          }
        }
      case getType(clientActions.logout):
        return initialUserState;
      default:
        return state
    }
  }
});

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));