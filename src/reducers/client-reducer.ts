import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { AuthResponse, IUserDTO } from '../models';
import { Nullable } from '../.types/types';
import { clientActions } from '../actions';
import { ReducerBaseState } from './types';
import { initialNullableState } from './subroutines/states';
import { makeDefault, errorHandling, store } from './subroutines/cases';

export interface UserBaseState extends ReducerBaseState<Nullable<IUserDTO>> { }
export interface AuthState extends ReducerBaseState<Nullable<AuthResponse>> { }

export type ClientState = {
  readonly auth: AuthState;
  readonly user: UserBaseState;
};

export const initialAuthState = {
  ...initialNullableState,
  isLoading: false,
};
export const initialUserState = initialNullableState;

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
        return errorHandling(state, action.payload)
      default:
        return state;
    }
  },
  user: (state = initialUserState, action) => {
    switch (action.type) {
      case getType(clientActions.fetchUserData.request):
        return makeDefault(state)

      case getType(clientActions.fetchUserData.success):
        return store(state, action.payload)

      case getType(clientActions.fetchUserData.failure):
        return errorHandling(state, action.payload)

      case getType(clientActions.editUserData.request):
        return {
          ...state,
          error: null,
        };
      case getType(clientActions.editUserData.success):
        return {
          ...state,
        }
      case getType(clientActions.editUserData.failure):
        return {
          ...state,
          error: action.payload,
        }
      case getType(clientActions.uploadUserImage.request):
        return {
          ...state,
          error: null,
        };
      case getType(clientActions.uploadUserImage.success):
        return {
          ...state,
          data: state.data && {
            ...state.data,
            image: action.payload,
          }
        }
      case getType(clientActions.logout):
        return initialUserState;
      default:
        return state
    }
  },
});

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));