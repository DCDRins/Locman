import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { Tag, City, IOrganizationDTO, EducationProgram } from '../models';
import { catalogActions } from '../actions';
import { ReducerBaseState, HasLifeTime } from './types';
import { Pagination, NamedType, Nullable, MessageReply } from '../.types/types';
import moment from 'moment';
import { initialPaginationState, initialArrayState, initialNullableState } from './subroutines/states';
import { storeList, makeDefault, restore, errorHandling, store, storePlus } from './subroutines/cases';

export interface TagsBaseState extends ReducerBaseState<Pagination<Tag>>, HasLifeTime { }
export interface CitiesBaseState extends ReducerBaseState<Array<City>>, HasLifeTime { }
export interface AcceptedOrganizationListBaseState extends ReducerBaseState<Nullable<Array<IOrganizationDTO>>> { }
export interface OrganizationTypesBaseState extends ReducerBaseState<Array<NamedType>> { }
export interface OrganizationCategoriesBaseState extends ReducerBaseState<Pagination<NamedType>> { }
export interface UserEduProgramListBaseState extends ReducerBaseState<Pagination<EducationProgram>> { }
export interface SubjectListBaseState extends ReducerBaseState<Pagination<NamedType>> { }

export interface EventCatalogBaseState {
  formatList: {
    data: NamedType[];
    isLoading: boolean;
  };
  levelList: {
    data: NamedType[];
    isLoading: boolean;
  };
}

export interface CatalogState {
  readonly tags: TagsBaseState;
  readonly cities: CitiesBaseState;
  readonly event: EventCatalogBaseState;
  readonly acceptedOrganizations: AcceptedOrganizationListBaseState;
  readonly organizationTypes: OrganizationTypesBaseState;
  readonly organizationCategories: OrganizationCategoriesBaseState;
  readonly userEduProgramList: UserEduProgramListBaseState;
  readonly subjectList: SubjectListBaseState;
};

const initialTagState = Object.freeze({
  data: { list: [] },
  isLoading: false,
  error: null,
  lifeTime: 5,
})
const initialCitiesState = Object.freeze({
  data: [],
  isLoading: false,
  error: null,
  lifeTime: 5,
})
const initialEventCatalogState = Object.freeze({
  formatList: {
    data: [],
    isLoading: true,
  },
  levelList: {
    data: [],
    isLoading: true,
  },
})
const initialAcceptedOrganizationsState = Object.freeze({
  data: [],
  isLoading: true,
  error: null,
})
const initialOrganizationTypesState = initialArrayState
const initialOrganizationCategoriesState = initialPaginationState;
const initialUserEduProgramListBaseState = initialNullableState
const initialSubjectListState = initialPaginationState

export type CatalogAction = ActionType<typeof catalogActions>;

export default combineReducers<CatalogState, CatalogAction>({
  tags: (state = initialTagState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchTagListAsync.request):
        return makeDefault(state);

      case getType(catalogActions.fetchTagListAsync.success):
        return restore(state, action.payload);
        
      case getType(catalogActions.fetchTagListAsync.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  cities: (state = initialCitiesState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchCitiesListAsync.request):
        return makeDefault(state);

      case getType(catalogActions.fetchCitiesListAsync.success):
        return restore(state, action.payload);
        
      case getType(catalogActions.fetchCitiesListAsync.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  acceptedOrganizations: (state = initialAcceptedOrganizationsState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchAcceptedOrganizationList.request):
        return makeDefault(state);

      case getType(catalogActions.fetchAcceptedOrganizationList.success):
        return {
          ...state,
          isLoading: false,
          data: action.payload || [],
        };
        
      case getType(catalogActions.fetchAcceptedOrganizationList.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  organizationCategories: (state = initialOrganizationCategoriesState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchOrganizationCategories.request):
        return makeDefault(state);

      case getType(catalogActions.fetchOrganizationCategories.success):
        return storeList(state, action.payload);

      case getType(catalogActions.fetchOrganizationCategories.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  organizationTypes: (state = initialOrganizationTypesState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchOrganizationTypes.request):
        return makeDefault(state);

      case getType(catalogActions.fetchOrganizationTypes.success):
        return store(state, action.payload)
        
      case getType(catalogActions.fetchOrganizationTypes.failure):
        return errorHandling(state, action.payload);

      default:
        return state;
    }
  },
  event: (state = initialEventCatalogState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchEventFormatList.request):
        return {
          ...state,
          formatList: {
            data: [],
            isLoading: true,
          }
        };
      case getType(catalogActions.fetchEventFormatList.success):
        return {
          ...state,
          formatList: {
            ...state.formatList,
            data: action.payload,
            isLoading: false,
          }
        };
      case getType(catalogActions.fetchEventFormatList.failure):
        return {
          ...state,
          formatList: {
            ...state.formatList,
            isLoading: false,
          }
        };
      case getType(catalogActions.fetchEventLevelList.request):
        return {
          ...state,
          levelList: {
            data: [],
            isLoading: true,
          }
        };
      case getType(catalogActions.fetchEventLevelList.success):
        return {
          ...state,
          levelList: {
            ...state.levelList,
            data: action.payload,
            isLoading: false,
          }
        };
      case getType(catalogActions.fetchEventLevelList.failure):
        return {
          ...state,
          levelList: {
            ...state.levelList,
            isLoading: false,
          }
        };
      default:
        return state;
    }
  },
  userEduProgramList: (state = initialUserEduProgramListBaseState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchUserEduProgramList.request):
        return makeDefault(state)

      case getType(catalogActions.fetchUserEduProgramList.success):
        return storeList(state, action.payload)

      case getType(catalogActions.fetchUserEduProgramList.failure):
        return errorHandling(state, action.payload)

      case getType(catalogActions.createEduProgram.request):
        return makeDefault(state)

      case getType(catalogActions.createEduProgram.success):
        return initialUserEduProgramListBaseState;
        
      case getType(catalogActions.createEduProgram.failure):
        return errorHandling(state, action.payload)

      default:
        return state;
    }
  },
  subjectList: (state = initialSubjectListState, action) => {
    switch (action.type) {
      case getType(catalogActions.fetchSubjectList.request):
        return makeDefault(state)

      case getType(catalogActions.fetchSubjectList.success):
        return storeList(state, action.payload)

      case getType(catalogActions.fetchSubjectList.failure):
        return errorHandling(state, action.payload)

      default:
        return state;
    }
  },
})