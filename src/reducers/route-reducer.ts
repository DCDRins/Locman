import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { IRouteDTO } from '../models';
import { routeActions } from '../actions';

export type RouteState = {
  readonly routes: {
    data?: IRouteDTO[];
    isLoading: boolean;
  };
};

const initialState = Object.freeze({
  isLoading: false,
})

export type RoutesAction = ActionType<typeof routeActions>;

export default combineReducers<RouteState, RoutesAction>({
  routes: (state = initialState, action) => {
    switch (action.type) {
      case getType(routeActions.fetchRouteListAsync.success):
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