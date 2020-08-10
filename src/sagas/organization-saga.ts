// ./src/store/heroes/sagas.ts

import { select, call, put, take, all, fork } from 'redux-saga/effects'
import { organization } from '../services/api';
import * as actions from '../actions'
import { IOrganizationDTO, IOrganization, IUserDTO, OrganizationFilters, IOrganizationDTOExtended } from '../models';
import { Message, HasCodeParams, Nullable, MessageReply, ImageType, HasPaginationParams, Pagination, IFetchParamsExtended } from '../.types/types'
import { getType } from 'typesafe-actions';
import handleErrors from './subroutines/handleErrors';
import { ServerResponse } from '../services/api/types';
import { selectOrganizationList, organizationListComparison } from '../selectors/organization-selectors';

function* loadOrganizationData(id: number): Generator {
  try {
    const response = (yield call(organization.fetch, id)) as IOrganizationDTO;
    yield put(actions.organizationActions.fetchOrganizationData.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.fetchOrganizationData.failure(data));
  }
}
function* loadOrganizationByInn(inn: string): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(organization.fetchOrganizationByInn, inn)) as MessageReply<Nullable<IOrganizationDTO>>;
    yield put(actions.organizationActions.fetchOrganizationByInn.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    handleErrors(status);
    yield put(actions.organizationActions.fetchOrganizationByInn.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* registerNewOrganization(data: IOrganization): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(organization.registerNewOrganization, data)) as Message;
    yield put(actions.organizationActions.registerNewOrganization.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
    window.location.reload();
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.registerNewOrganization.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Организацию нельзя привязать или она уже привязана к другому профилю" }));
  }
}
function* editOrganizationData(data: IOrganization): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(organization.edit, data)) as Message;
    yield put(actions.organizationActions.editOrganizationData.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.editOrganizationData.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: 'Что-пошло не так' }));
  }
}
function* uploadOrganizationImage(params: HasCodeParams<File>): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(organization.uploadImage, params)) as MessageReply<ImageType>;
    yield put(actions.organizationActions.uploadOrganizationImage.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.uploadOrganizationImage.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* loadOrganizationUserList(params: HasPaginationParams): Generator {
  try {
    const response = (yield call(organization.fetchOrganizationUserList, params)) as Pagination<IUserDTO>;
    yield put(actions.organizationActions.fetchOrganizationUserList.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.fetchOrganizationUserList.failure(data));
  }
}
function* loadOrganizationList(params: IFetchParamsExtended<OrganizationFilters>): Generator {
  try {
    const response = (yield call(organization.fetchOrganizationList, params)) as Nullable<Pagination<IOrganizationDTOExtended>>;
    const data = (yield select(organizationListComparison, response)) as Nullable<Pagination<IOrganizationDTOExtended>>;
    yield put(actions.organizationActions.fetchOrganizationList.success(data));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.organizationActions.fetchOrganizationList.failure(data));
  }
}

// WATHCERS ------------

function* watchLoadOrganizationData() {
  while (true) {
    const { payload: id } : { payload: number } = yield take(getType(actions.organizationActions.fetchOrganizationData.request));
    yield fork(loadOrganizationData, id);
  }
}
function* watchLoadOrganizationByInn() {
  while (true) {
    const { payload: { inn } }: { payload: { inn: string } } = yield take(getType(actions.organizationActions.fetchOrganizationByInn.request));
    yield fork(loadOrganizationByInn, inn);
  }
}
function* watchRegisterNewOrganization() {
  while (true) {
    const { payload: data }: { payload: IOrganization } = yield take(getType(actions.organizationActions.registerNewOrganization.request));
    yield fork(registerNewOrganization, data);
  }
}
function* watchEditOrganizationData() {
  while (true) {
    const { payload: data } : { payload: IOrganization } = yield take(getType(actions.organizationActions.editOrganizationData.request));
    yield fork(editOrganizationData, data);
  }
}
function* watchUploadOrganizationImage() {
  while (true) {
    const { payload: params } : { payload: HasCodeParams<File> } = yield take(getType(actions.organizationActions.uploadOrganizationImage.request));
    yield fork(uploadOrganizationImage, params);
  }
}
function* watchLoadOrganizationUserList() {
  while (true) {
    const { payload: params }: { payload: HasPaginationParams } = yield take(getType(actions.organizationActions.fetchOrganizationUserList.request));
    yield fork(loadOrganizationUserList, params);
  }
}
function* watchLoadOrganizationList() {
  while (true) {
    const { payload: params }: { payload: IFetchParamsExtended<OrganizationFilters> } = yield take(getType(actions.organizationActions.fetchOrganizationList.request));
    const data = (yield select(selectOrganizationList, params)) as Nullable<Pagination<IOrganizationDTOExtended>>
    if (data) yield put(actions.organizationActions.fetchOrganizationList.success(data))
    else yield fork(loadOrganizationList, params);
  }
}


export default function* () {
  yield all([
    fork(watchLoadOrganizationData),
    fork(watchLoadOrganizationByInn),
    fork(watchRegisterNewOrganization),
    fork(watchEditOrganizationData),
    fork(watchUploadOrganizationImage),
    fork(watchLoadOrganizationUserList),
    fork(watchLoadOrganizationList),
  ])
}
// export function* refreshRequestWatcher() {
//   yield takeLatest(getType(refreshAsync.request), refreshWorker)
// }
