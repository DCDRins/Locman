// ./src/store/heroes/sagas.ts

import { cancel, select, call, put, take, all, fork } from 'redux-saga/effects'
import { client, setToken } from '../services/api';
import * as actions from '../actions'
import { AuthResponse, AuthParams, IUserDTO, User, IUser } from '../models';
import { Nullable, ErrorReply, Message, MessageReply, ImageReply } from '../.types/types'
import { getType } from 'typesafe-actions';
import { remember, recall } from '../lib/localStorage';
import history from '../services';
import { appRoutes, officeAppRoutes } from '../common/dictionaries/routes';
import { forget } from '../lib/localStorage';
import { getUserData } from '../selectors/client-selectors';
import handleErrors from './subroutines/handleErrors';
import { ServerResponse } from '../services/api/types';

function* authWorker(payload: AuthParams): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(client.auth, payload)) as AuthResponse;
    yield remember<AuthResponse>('client', response);
    yield setToken()
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded({ message: 'Успешно' }));
    history.push(appRoutes.OFFICE_PAGE.absolutePath)
    yield put(actions.clientActions.authAsync.success(response));
  } catch ({ response }) {
    const { data } = response as ServerResponse<ErrorReply>;
    yield put(actions.clientActions.authAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* refreshWorker(): Generator {
  try {
    const response = (yield call(client.refresh)) as AuthResponse;
    yield put(actions.clientActions.refreshAsync.success(response));
  } catch (err) {
    yield put(actions.clientActions.refreshAsync.failure(err));
  }
}

function* loadUserData(): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const user = (yield call(client.fetchUserData)) as User;
    const { name } = user;
    yield put(actions.clientActions.fetchUserData.success(user));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded({ message: `Здравствуйте, ${name}!` }));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.clientActions.fetchUserData.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}

function* editUserData(user: IUser): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(client.editUserData, user)) as Message;
    yield put(actions.clientActions.editUserData.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.clientActions.editUserData.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}

function* uploadUserImage(image: File): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const { data: { path }, message } = (yield call(client.uploadUserImage, image)) as MessageReply<ImageReply>;
    yield put(actions.clientActions.uploadUserImage.success(path));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded({ message }));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.clientActions.uploadUserImage.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}

// WATHCERS ------------


function* loginFlow() { // without reload
  const client = yield recall<AuthResponse>('client');
  while (true) {
    if (!client) {
      const { payload }: { payload: AuthParams } = yield take(getType(actions.clientActions.authAsync.request));
      yield fork(authWorker, payload);
    }
    yield take(getType(actions.clientActions.logout))
    yield forget('client')
    history.push(appRoutes.MAIN_PAGE.absolutePath)
  }
}
function* watchLoadUserData() {
  while (true) {
    yield take(getType(actions.clientActions.fetchUserData.request));
    const data = (yield select(getUserData)) as Nullable<User>;
    if (data) {
      yield put(actions.clientActions.fetchUserData.success(data))
    } else { 
      yield fork(loadUserData);
    }
  }
}
function* watchEditUserData() {
  while (true) {
    const { payload }: { payload: IUser } = yield take(getType(actions.clientActions.editUserData.request));
    yield fork(editUserData, payload);
  }
}
function* watchUploadUserImage() {
  while (true) {
    const { payload }: { payload: File } = yield take(getType(actions.clientActions.uploadUserImage.request));
    yield fork(uploadUserImage, payload);
  }
}

export default function* () {
  yield all([
    fork(loginFlow),
    fork(watchLoadUserData),
    fork(watchEditUserData),
    fork(watchUploadUserImage),
  ])
}
// export function* refreshRequestWatcher() {
//   yield takeLatest(getType(refreshAsync.request), refreshWorker)
// }
