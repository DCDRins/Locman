import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { ISliderNewsDTO, INewsDTO } from '../models';
import { newsActions } from '../actions';
import { ReducerBaseState } from './types';
import moment from 'moment';
import { Nullable, Pagination } from '../.types/types';

export interface SliderBaseState extends ReducerBaseState<Nullable<ISliderNewsDTO[]>> { }
export interface NewsListBaseState extends ReducerBaseState<Nullable<Pagination<INewsDTO>>> { }

export interface NewsState {
  readonly slider: SliderBaseState;
  readonly newsList: NewsListBaseState;
};

const initialNewsListState = Object.freeze({
  data: null,
  isLoading: false,
  error: null,
})
const initialSliderState = Object.freeze({
  data: null,
  isLoading: false,
  error: null,
})

const makeDefault = state => ({
  ...state,
  isLoading: true,
  error: null,
})

const store = (state, payload) => ({
  ...state,
  data: payload,
  actualDate: moment(),
  isLoading: false,
})
const errorHandling = (state, payload) => ({
  ...state,
  error: payload,
  isLoading: false,
})

export type NewsAction = ActionType<typeof newsActions>;

export default combineReducers<NewsState, NewsAction>({
  slider: (state = initialSliderState, action) => {
    switch (action.type) {
      case getType(newsActions.fetchSliderNews.request):
        return makeDefault(state);

      case getType(newsActions.fetchSliderNews.success):
        return store(state, action.payload);
        
      case getType(newsActions.fetchSliderNews.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  newsList: (state = initialNewsListState, action) => {
    switch (action.type) {
      case getType(newsActions.fetchNewsList.request):
        return makeDefault(state);

      case getType(newsActions.fetchNewsList.success):
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
        
      case getType(newsActions.fetchNewsList.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
})