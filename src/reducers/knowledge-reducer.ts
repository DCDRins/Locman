import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { IArticleDTO, ICategoryDTO } from '../models';
import { knowledgeActions } from '../actions';
import { ReducerDefaultState } from './types';
import { Pagination } from '../.types/types';

export interface KnowledgeState {
  readonly articles: ReducerDefaultState<Pagination<IArticleDTO>>;
  readonly categories: ReducerDefaultState<Pagination<ICategoryDTO>>;
};

const initialArticleState = Object.freeze({
  data: { list: [] },
  isLoading: true,
  error: null,
})
const initialCategoriesState = Object.freeze({
  data: { list: [] },
  isLoading: true,
  error: null,
})

const makeDefault = state => ({
  ...state,
  isLoading: true,
  error: null,
})

const addToStore = (state, payload) => ({
  ...state,
  data: {
    ...state.data,
    list: [...state.data.list, payload],
  },
  isLoading: false,
})

const errorHandling = (state, payload) => ({
  ...state,
  error: payload,
  isLoading: false,
})

export type KnowledgeAction = ActionType<typeof knowledgeActions>;

export default combineReducers<KnowledgeState, KnowledgeAction>({
  articles: (state = initialArticleState, action) => {
    switch (action.type) {
      // fetch one
      case getType(knowledgeActions.fetchArticleAsync.request):
        return makeDefault(state);
        
      case getType(knowledgeActions.fetchArticleAsync.success):
        return addToStore(state, action.payload);

      case getType(knowledgeActions.fetchArticleAsync.failure):
        return errorHandling(state,  action.payload);
        
        // fetch list
      case getType(knowledgeActions.fetchArticleListAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.fetchArticleListAsync.success):
        return {
          ...state,
          data: {
            ...action.payload,
            list: [...state.data.list, action.payload.list],
          },
          isLoading: false,
        }

      case getType(knowledgeActions.fetchArticleListAsync.failure):
        return errorHandling(state,  action.payload);
        
        // create one
      case getType(knowledgeActions.createArticleAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.createArticleAsync.success):
        return addToStore(state, action.payload);

      case getType(knowledgeActions.createArticleAsync.failure):
        return errorHandling(state, action.payload);

        // edit one
      case getType(knowledgeActions.editArticleAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.editArticleAsync.success):
        return {
          ...state,
          data: state.data.list.map(article => article.characterCode === action.payload.data.characterCode ? { ...action.payload.data } : article),
          isLoading: false,
        }

      case getType(knowledgeActions.editArticleAsync.failure):
        return errorHandling(state, action.payload);
    
        // delete one
      case getType(knowledgeActions.deleteArticleAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.deleteArticleAsync.success):
        return {
          ...state,
          // here need to delete by payloaded data
          isLoading: false,
        }

      case getType(knowledgeActions.deleteArticleAsync.failure):
        return errorHandling(state,  action.payload);

      default:
        return state;
    }
  },
  categories: (state = initialCategoriesState, action) => {
    switch (action.type) {
      case getType(knowledgeActions.fetchCategoriesAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.fetchCategoriesAsync.success):
        return addToStore(state, action.payload);
        
      case getType(knowledgeActions.fetchCategoriesAsync.failure):
        return errorHandling(state, action.payload);

      case getType(knowledgeActions.createCategoryAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.createCategoryAsync.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      case getType(knowledgeActions.createCategoryAsync.failure):
        return errorHandling(state, action.payload);

      case getType(knowledgeActions.deleteCategoryAsync.request):
        return makeDefault(state);

      case getType(knowledgeActions.deleteCategoryAsync.success):
        return {
          ...state,
          data: action.payload,
          isLoading: false,
        }
      case getType(knowledgeActions.deleteCategoryAsync.failure):
       return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
});

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));