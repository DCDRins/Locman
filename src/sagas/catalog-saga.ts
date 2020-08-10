import { select, call, put, take, fork, all } from 'redux-saga/effects'
import { Pagination, HasSearchParams, HasNameParams, Nullable, NamedType, HasPaginationParams, MessageReply } from '../.types/types';
import { Tag, City, AcceptedOrganizationFilter, IOrganizationDTO, EducationProgram } from '../models';
import { getType } from 'typesafe-actions';
import { catalog } from '../services/api';
import * as actions from '../actions';
import {
  // selectTags,
  // selectCities,
  selectEventFormatList,
  selectEventLevelList,
  selectProgramList,
  programListComparison,
} from '../selectors/catalog-selectors';
import handleErrors from './subroutines/handleErrors';
import { previewItemsCount, paginationLimit } from '../common/constants';

function* fetchTagList(params: HasSearchParams): Generator {
  try {
    const response = (yield call(catalog.fetchTagList, params)) as Pagination<Tag>;
    yield put(actions.catalogActions.fetchTagListAsync.success(response));
  } catch ({ response }) {
    yield put(actions.catalogActions.fetchTagListAsync.failure(response));
  }
}
function* fetchCitiesList(name: HasNameParams): Generator {
  try {
    const response = (yield call(catalog.fetchCitiesList, name)) as Array<City>;
    yield put(actions.catalogActions.fetchCitiesListAsync.success(response));
  } catch ({ response }) {
    yield put(actions.catalogActions.fetchCitiesListAsync.failure(response));
  }
}
function* fetchEventFormatList(): Generator {
  try {
    const response = (yield call(catalog.fetchEventFormatList)) as Array<NamedType>;
    yield put(actions.catalogActions.fetchEventFormatList.success(response));
  } catch { }
}
function* fetchEventLevelList(): Generator {
  try {
    const response = (yield call(catalog.fetchEventLevelList)) as Array<NamedType>;
    yield put(actions.catalogActions.fetchEventLevelList.success(response));
  } catch { }
}
function* fetchAcceptedOrganizationList(params: AcceptedOrganizationFilter): Generator {
  try {
    const response = (yield call(catalog.fetchAcceptedOrganizationList, params)) as Nullable<Array<IOrganizationDTO>>;
    yield put(actions.catalogActions.fetchAcceptedOrganizationList.success(response));
  } catch ({ response }) {
    yield put(actions.catalogActions.fetchAcceptedOrganizationList.failure(response));
  }
}
function* loadOrganizationTypes(): Generator {
  try {
    const response = (yield call(catalog.fetchOrganizationTypes)) as Array<NamedType>;
    yield put(actions.catalogActions.fetchOrganizationTypes.success(response));
  } catch ({ response }) {
    yield put(actions.catalogActions.fetchOrganizationTypes.failure(response));
  }
}
function* loadOrganizationCategories(params: HasPaginationParams): Generator {
  try {
    const response = (yield call(catalog.fetchOrganizationCategories, params)) as Pagination<NamedType>;
    yield put(actions.catalogActions.fetchOrganizationCategories.success(response));
  } catch ({ response }) {
    const { status, data } = response;
    yield handleErrors(status);
    yield put(actions.catalogActions.fetchOrganizationCategories.failure(data));
  }
}
function* loadUserEduProgram(params: HasPaginationParams): Generator {
  try {
    const response = (yield call(catalog.fetchUserEduProrgamList, params)) as Nullable<Pagination<EducationProgram>>;
    const data = (yield select(programListComparison, response)) as Nullable<Pagination<EducationProgram>>;
    yield put(actions.catalogActions.fetchUserEduProgramList.success(data));
  } catch ({ response }) {
    const { status, data } = response;
    yield handleErrors(status);
    yield put(actions.catalogActions.fetchUserEduProgramList.failure(data));
  }
}
function* createEduProgram(program: EducationProgram): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(catalog.createEduProrgam, program)) as MessageReply<EducationProgram>;
    yield put(actions.catalogActions.createEduProgram.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
    yield put(actions.catalogActions.fetchUserEduProgramList.request({ onPage: paginationLimit }));
  } catch ({ response }) {
    const { status, data } = response;
    yield handleErrors(status);
    yield put(actions.catalogActions.fetchUserEduProgramList.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* loadSubjectList(params: HasPaginationParams & { name?: string }): Generator {
  try {
    const response = (yield call(catalog.fetchSubjectList, params)) as Pagination<NamedType>;
    yield put(actions.catalogActions.fetchSubjectList.success(response));
  } catch ({ response }) {
    const { status, data } = response;
    yield handleErrors(status);
    yield put(actions.catalogActions.fetchSubjectList.failure(data));
  }
}

// WATCHERS ----------
function* watchLoadTagList() {
  while (true) {
    const { payload: params }: { payload: HasSearchParams } = yield take(getType(actions.catalogActions.fetchTagListAsync.request));
    yield fork(fetchTagList, params);
  }
}
function* watchLoadCitiesList() {
  while (true) {
    const { payload: params }: { payload: HasNameParams } = yield take(getType(actions.catalogActions.fetchCitiesListAsync.request));
    yield fork(fetchCitiesList, params);
  }
}
function* watchLoadEventFormatList() {
  while (true) {
    yield take(getType(actions.catalogActions.fetchEventFormatList.request));
    const data = (yield select(selectEventFormatList)) as NamedType[];
    if (!data) yield fork(fetchEventFormatList);
  }
}
function* watchLoadEventLevelList() {
  while (true) {
    yield take(getType(actions.catalogActions.fetchEventLevelList.request));
    const data = (yield select(selectEventLevelList)) as NamedType[];
    if (!data) yield fork(fetchEventLevelList);
  }
}
function* watchLoadAcceptedOrganizationList() {
  while (true) {
    const { payload: params }: { payload: AcceptedOrganizationFilter } = yield take(getType(actions.catalogActions.fetchAcceptedOrganizationList.request));
    yield fork(fetchAcceptedOrganizationList, params);
  }
}
function* watchLoadOrganizationTypes() {
  while (true) {
    yield take(getType(actions.catalogActions.fetchOrganizationTypes.request));
    yield fork(loadOrganizationTypes);
  }
}
function* watchLoadOrganizationCategories() {
  while (true) {
    const { payload: params }: { payload: HasPaginationParams } = yield take(getType(actions.catalogActions.fetchOrganizationCategories.request));
    yield fork(loadOrganizationCategories, params);
  }
}
function* watchLoadUserEduProgram() {
  while (true) {
    const { payload: params }: { payload: HasPaginationParams } = yield take(getType(actions.catalogActions.fetchUserEduProgramList.request));
    const data = (yield select(selectProgramList, params)) as Pagination<EducationProgram>;
    if (data) yield put(actions.catalogActions.fetchUserEduProgramList.success(data));
    else yield fork(loadUserEduProgram, params);
  }
}
function* watchCreateEduProgram() {
  while (true) {
    const { payload: program }: { payload: EducationProgram } = yield take(getType(actions.catalogActions.createEduProgram.request));
    yield fork(createEduProgram, program);
  }
}
function* watchLoadSubjectList() {
  while (true) {
    const { payload: params }: { payload: HasPaginationParams & { name?: string } } = yield take(getType(actions.catalogActions.fetchSubjectList.request));
    yield fork(loadSubjectList, params);
  }
}

export default function* () {
  yield all([
    fork(watchLoadTagList),
    fork(watchLoadCitiesList),
    fork(watchLoadEventFormatList),
    fork(watchLoadEventLevelList),
    fork(watchLoadAcceptedOrganizationList),
    fork(watchLoadOrganizationTypes),
    fork(watchLoadOrganizationCategories),
    fork(watchLoadUserEduProgram),
    fork(watchCreateEduProgram),
    fork(watchLoadSubjectList),
  ])
}