import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { IRouteDTO } from '../models';
import { routeActions } from '../actions';
import { ReducerBaseState, HasLifeTime } from './types';
import { Pagination, Nullable } from '../.types/types';
import moment from 'moment';

export interface AcceptedRouteListBaseState extends ReducerBaseState<Pagination<IRouteDTO>> { }
export interface CurrentRouteBaseState extends ReducerBaseState<Nullable<IRouteDTO>> { }

export interface RouteState {
  readonly acceptedRouteList: AcceptedRouteListBaseState;
  readonly current: CurrentRouteBaseState & HasLifeTime;
};

export const initialAcceptedRouteListState = Object.freeze({
  data: { list: [] },
  isLoading: false,
  error: null,
})
export const initialCurrentRouteState = Object.freeze({
  data: null,
  isLoading: false,
  error: null,
  lifeTime: 5,
})

export type RoutesAction = ActionType<typeof routeActions>;

export default combineReducers<RouteState, RoutesAction>({
  acceptedRouteList: (state = initialAcceptedRouteListState, action) => {
    switch (action.type) {
      case getType(routeActions.fetchAcceptedRouteList.request):
        return {
          ...state,
          isLoading: false,
          error: null,
        }
      case getType(routeActions.fetchAcceptedRouteList.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      case getType(routeActions.fetchAcceptedRouteList.failure):
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        }
      default:
        return state;
    }
  },
  current: (state = initialCurrentRouteState, action) => {
    switch (action.type) {
      case getType(routeActions.fetchCurrentRoute.request):
        return {
          ...state,
          data: null,
          isLoading: true,
          actualDate: moment(),
        }
      case getType(routeActions.fetchCurrentRoute.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      case getType(routeActions.fetchCurrentRoute.failure):
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        }
      default:
        return state;
    }
  },
});

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));