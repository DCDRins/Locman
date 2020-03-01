import { ActionType, getType } from 'typesafe-actions';
import { IEventDTO, Pagination } from '../models';
import { eventActions } from '../actions';
import { ReducerDefaultState } from './types';

export interface EventBaseState extends ReducerDefaultState<Pagination<IEventDTO>> { }
export interface EventState extends EventBaseState {
  singleData?: IEventDTO;
  cache?: IEventDTO[];
};

const initialState = Object.freeze({
  data: { list: [] },
  isLoading: true,
  error: null,
})

const makeDefault = state => ({
  ...state,
  isLoading: true,
  error: null,
})

const addListToStore = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
})
const store = (state, payload) => ({
  ...state,
  singleData: payload,
  isLoading: false,
})
const errorHandling = (state, payload) => ({
  ...state,
  error: payload,
  isLoading: false,
})
export type EventAction = ActionType<typeof eventActions>;

export default (state: EventState = initialState, action: EventAction) => {
  switch (action.type) {

    case getType(eventActions.fetchEventAsync.request):
      return makeDefault(state);

    case getType(eventActions.fetchEventAsync.success):
      return store(state, action.payload)

    case getType(eventActions.fetchEventAsync.failure):
      return errorHandling(state, action.payload)
      
    case getType(eventActions.fetchEventListAsync.request):
      return makeDefault(state);

    case getType(eventActions.fetchEventListAsync.success):
      return addListToStore(state, action.payload)

    case getType(eventActions.fetchEventListAsync.failure):
      return errorHandling(state, action.payload)

    case getType(eventActions.fetchUserEventListAsync.request):
      return makeDefault(state);

    case getType(eventActions.fetchUserEventListAsync.success):
      return addListToStore(state, action.payload)

    case getType(eventActions.fetchUserEventListAsync.failure):
      return errorHandling(state, action.payload)
    
    case getType(eventActions.createEventAsync.request):
      return makeDefault(state);

    case getType(eventActions.createEventAsync.success):
      return {
        ...state,
        data: {
          list: [...state.data.list, action.payload]
        },
        isLoading: false,
      }

    case getType(eventActions.createEventAsync.failure):
      return errorHandling(state, action.payload)

    case getType(eventActions.deleteEventAsync.request):
      return makeDefault(state);

    case getType(eventActions.deleteEventAsync.success):
      return {
        ...state,
        isLoading: false,
      }

    case getType(eventActions.deleteEventAsync.failure):
      return errorHandling(state, action.payload)

    default:
      return state;
  }
}

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));