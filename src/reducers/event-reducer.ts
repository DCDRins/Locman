import { ActionType, getType } from 'typesafe-actions';
import { IEventDTO, ClosestEvent, EducationProgram } from '../models';
import { eventActions } from '../actions';
import { ReducerBaseState } from './types';
import { Pagination, Nullable, MessageReply } from '../.types/types';
import { combineReducers } from 'redux';
import { errorHandling, store, makeDefault, storeList } from './subroutines/cases';

export interface ManagedEventListBaseState extends ReducerBaseState<Nullable<Pagination<IEventDTO>>> { }
export interface StockEventListBaseState extends ReducerBaseState<Nullable<Pagination<IEventDTO>>> { }
export interface CurrentEventBaseState extends ReducerBaseState<Nullable<IEventDTO>> { }
export interface ClosestEventBaseState extends ReducerBaseState<Nullable<ClosestEvent>> { }
// export interface FreshEventBaseState extends ReducerBaseState<Nullable<Pagination<IEventDTO>>> { }

export interface EventState {
  readonly managedList: ManagedEventListBaseState;
  readonly stockList: StockEventListBaseState;
  readonly current: CurrentEventBaseState;
  readonly closest: ClosestEventBaseState;
  // readonly fresh: FreshEventBaseState;
};

export const initialManagedEventListState = Object.freeze({
  data: null,
  isLoading: true,
  error: null,
})
export const initialCurrentEventState = Object.freeze({
  data: null,
  isLoading: true,
  error: null,
})
export const initialStockEventState = Object.freeze({
  data: null,
  isLoading: true,
  error: null,
})
export const initialClosestEventState = Object.freeze({
  data: null,
  isLoading: true,
  error: null,
})
// export const initialFreshEventState = Object.freeze({
//   data: null,
//   isLoading: true,
//   error: null,
// })


export type EventAction = ActionType<typeof eventActions>;

export default combineReducers<EventState, EventAction>({
  managedList: (state = initialManagedEventListState, action) => {
    switch (action.type) {

      case getType(eventActions.fetchManagedEventListAsync.request):
        return makeDefault(state);

      case getType(eventActions.fetchManagedEventListAsync.success):
        return storeList(state, action.payload)

      case getType(eventActions.fetchManagedEventListAsync.failure):
        return errorHandling(state, action.payload)
      
      case getType(eventActions.createEventAsync.request):
        return makeDefault(state);

      case getType(eventActions.createEventAsync.success):
        return {
          ...makeDefault(state),
          data: null,
        }
      case getType(eventActions.createEventAsync.failure):
        return errorHandling(state, action.payload)

      case getType(eventActions.editEventAsync.request):
        return makeDefault(state);

      case getType(eventActions.editEventAsync.success):
        return {
          isLoading: false,
          data: state.data && {
            list: state.data.list.map(event => event.id === action.payload.data.id ? {
              ...event,
              ...action.payload.data,
            } : event),
          },
        }
      case getType(eventActions.editEventAsync.failure):
        return errorHandling(state, action.payload)

      case getType(eventActions.deleteEventAsync.request):
        return makeDefault(state);

      case getType(eventActions.deleteEventAsync.success):
        return {
          ...state,
          isLoading: false,
          data: state.data && {
            list: state.data.list.filter(item => item.id !== action.payload.data.id)
          }
        }

      case getType(eventActions.deleteEventAsync.failure):
        return errorHandling(state, action.payload)

      case getType(eventActions.uploadImageAsync.success):
        return {
          ...state,
          data: state.data && {
            ...state.data,
            list: state.data.list.map(
              e => e.id === action.payload.data.id
                ? { ...e, image: action.payload.data}
                : e
            ),
          },
        }
      case getType(eventActions.uploadImageRangeAsync.success):
        return {
          ...state,
          data: state.data && {
            ...state.data,
            list: state.data.list.map(
              e => e.id === action.payload.data.event
                ? { ...e, images: [
                  ...e.images,
                  ...action.payload.data.images,
                ]}
                : e
            ),
          },
        }
      case getType(eventActions.deleteImageFromRangeAsync.success):
        return {
          ...state,
          data: state.data && {
            ...state.data,
            list: state.data.list.map(
              e => e.id === action.payload.data.event
                ? { ...e, images: e.images.filter(image => image.id !== action.payload.data.image)}
                : e
            ),
          },
        }
      default:
        return state;
    }
  },
  stockList: (state = initialStockEventState, action) => {
    switch (action.type) {
      case getType(eventActions.fetchStockEventListAsync.request):
        return makeDefault(state);

      case getType(eventActions.fetchStockEventListAsync.success):
        return {
          ...state,
          isLoading: false,
          data: action.payload && {
            ...action.payload,
            list: state.data
              ? [...state.data.list, ...action.payload.list]
              : action.payload.list,
          },
        };

      case getType(eventActions.fetchStockEventListAsync.failure):
        return errorHandling(state, action.payload)

        default:
            return state;
    }
  },
  current: (state = initialCurrentEventState, action) => {
    switch (action.type) {
      case getType(eventActions.fetchEventAsync.request):
        return makeDefault(state);

      case getType(eventActions.fetchEventAsync.success):
        return store(state, action.payload)

      case getType(eventActions.fetchEventAsync.failure):
        return errorHandling(state, action.payload)
      
      case getType(eventActions.editEventAsync.success):
        return {
          isLoading: false,
          data: {
            ...state.data,
            ...action.payload.data,
          },
        }

      case getType(eventActions.uploadImageAsync.success): {
        const { id } = { ...state.data };
        return {
          ...state,
          data: id === action.payload.data.id && {
            ...state.data,
            image: action.payload.data.path,
          }
        }
      }
      case getType(eventActions.uploadImageRangeAsync.success): {
        const { id } = { ...state.data };
        return {
          ...state,
          data: id === action.payload.data.event && state.data && {
            ...state.data,
            images: [
              ...state.data.images,
              ...action.payload.data.images,
            ]
          }
        }
      }
      case getType(eventActions.deleteImageFromRangeAsync.success):
        return {
          ...state,
          data: state.data && {
            ...state.data,
            images: state.data.images.filter(image => image.id !== action.payload.data.image)
          },
        }
      default:
        return state;
    }
  },
  closest: (state = initialClosestEventState, action) => {
    switch (action.type) {
      case getType(eventActions.fetchClosestEvent.request):
        return {
          ...state,
          isLoading: true,
          error: null,
          data: null,
        }
      case getType(eventActions.fetchClosestEvent.success):
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        }
      case getType(eventActions.fetchClosestEvent.failure):
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        }
      default:
        return state;
    }
  },
  // fresh: (state = initialFreshEventState, action) => {
  //   switch (action.type) {
  //     case getType(eventActions.fetchFreshEventList.request):
  //       return {
  //         ...state,
  //         isLoading: true,
  //         error: null,
  //         data: null,
  //       }
  //     case getType(eventActions.fetchFreshEventList.success):
  //       return {
  //         ...state,
  //         isLoading: false,
  //         data: action.payload,
  //       }
  //     case getType(eventActions.fetchFreshEventList.failure):
  //       return {
  //         ...state,
  //         isLoading: false,
  //         error: action.payload,
  //       }
  //     default:
  //       return state;
  //   }
  // },
})

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));