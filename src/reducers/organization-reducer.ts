import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';

import { IOrganizationDTO, IUserDTO } from '../models';
import { Nullable, Pagination } from '../.types/types';
import { organizationActions } from '../actions';
import { ReducerBaseState } from './types';
import { initialNullableState, initialArrayState } from './subroutines/states';
import { makeDefault, storeList, errorHandling } from './subroutines/cases';

export interface CurrentOrganizationBaseState extends ReducerBaseState<Nullable<IOrganizationDTO>> { }
export interface NewOrganizationBaseState extends ReducerBaseState<Nullable<IOrganizationDTO>> { }
export interface OrganizationListBaseState extends ReducerBaseState<Nullable<IOrganizationDTO[]>> { }
export interface OrganizationUserListBaseState extends ReducerBaseState<Nullable<Pagination<IUserDTO>>> { }

export interface OrganizationState {
  readonly list: OrganizationListBaseState;
  readonly current: CurrentOrganizationBaseState;
  readonly new: NewOrganizationBaseState;
  readonly organizationUserList: OrganizationUserListBaseState;
}
export const initialCurrentOrganizationState = {
  ...initialNullableState,
  isLoading: false,
}
export const initialNewOrganizationState = initialNullableState;
export const initialOrganizationListState = initialArrayState;
export const initialOrganizationUserListState = initialNullableState;

export type OrganizationAction = ActionType<typeof organizationActions>;

export default combineReducers<OrganizationState, OrganizationAction>({
    current: (state = initialCurrentOrganizationState, action) => {
      switch (action.type) {
        case getType(organizationActions.fetchOrganizationData.request):
          return {
            ...state,
            data: null,
            isLoading: true,
            error: null,
          };
        case getType(organizationActions.fetchOrganizationData.success):
          return {
            ...state,
            data: action.payload,
            isLoading: false,
          }
        case getType(organizationActions.fetchOrganizationData.failure):
          return {
            ...state,
            error: action.payload,
            isLoading: false,
          }
        case getType(organizationActions.editOrganizationData.request):
          return {
            ...state,
            error: null,
          };
        case getType(organizationActions.editOrganizationData.success):
          return {
            ...state,
          }
        case getType(organizationActions.editOrganizationData.failure):
          return {
            ...state,
            error: action.payload,
          }
        case getType(organizationActions.uploadOrganizationImage.request):
          return {
            ...state,
            error: null,
          };
        case getType(organizationActions.uploadOrganizationImage.success):
          return {
            ...state,
            data: state.data && {
              ...state.data,
              image: action.payload.data,
            }
          }
        default:
          return state;
      }
    },
    new: (state = initialNewOrganizationState, action) => {
      switch (action.type) {
        case getType(organizationActions.fetchOrganizationByInn.request):
          return {
            ...state,
            data: null,
            error: null,
            isLoading: true,
          };
        case getType(organizationActions.fetchOrganizationByInn.success):
          return {
            ...state,
            data: action.payload.data,
            isLoading: false,
          }
        case getType(organizationActions.fetchOrganizationByInn.failure):
          return errorHandling(state, action.payload);
        default:
          return state;
      }
    },
    list: (state = initialOrganizationListState, action) => {
      switch (action.type) {
        default:
          return state;
      }
    },
    organizationUserList: (state = initialOrganizationUserListState, action) => {
      switch (action.type) {
        case getType(organizationActions.fetchOrganizationUserList.request):
          return makeDefault(state);
          
        case getType(organizationActions.fetchOrganizationUserList.success):
          return storeList(state, action.payload)
  
        case getType(organizationActions.fetchOrganizationUserList.failure):
          return errorHandling(state, action.payload);
  
        default:
          return state
      }
    },
  })

// export const routeReducer = createReducer({})
//     .handleAction(routes.fetchRouteListAsync.success, (state, action) => ({ ...state, todos: action.payload }));