// ./src/store/heroes/sagas.ts

import { select, call, put, take, all, fork } from 'redux-saga/effects'
import { client, setToken } from '../services/api';
import * as actions from '../actions'
import { AuthResponse, AuthParams, User, IUser, IRegistrationModel, IUserDTO } from '../models';
import { Nullable, ErrorReply, Message, MessageReply, ImageType, HasPaginationParams, Pagination } from '../.types/types'
import { getType } from 'typesafe-actions';
import { remember } from '../lib/localStorage';
import history from '../services';
import { appRoutes, officeAppRoutes } from '../common/dictionaries/routes';
import { forget } from '../lib/localStorage';
import { getUserData } from '../selectors/client-selectors';
import handleErrors from './subroutines/handleErrors';
import { ServerResponse } from '../services/api/types';
import isSatisfied from '../lib/isSatisfied';
import roles from '../common/dictionaries/roles';

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
function* registerWorker(payload: IRegistrationModel): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(client.register, payload)) as Message;
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
    history.push(officeAppRoutes.OFFICE_AUTH_PAGE.absolutePath)
  } catch ({ response }) {
    const { data } = response as ServerResponse<ErrorReply>;
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* confirmationWorker(token: string): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(client.confirm, token)) as Message;
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
    history.push(officeAppRoutes.OFFICE_AUTH_PAGE.absolutePath)
  } catch ({ response }) {
    const { data } = response as ServerResponse<ErrorReply>;
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}
function* loadUserData(): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const user = (yield call(client.fetchUserData)) as User;
    const { name, organization } = user;
    yield put(actions.clientActions.fetchUserData.success(user));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded({ message: `Здравствуйте, ${name}!` }));
    if (isSatisfied(officeAppRoutes.OFFICE_ORGANIZATION_PAGE.credentials) && organization.length === 0)
        history.push(officeAppRoutes.OFFICE_ORGANIZATION_PAGE.absolutePath)
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
    const _response = (yield call(client.fetchUserData)) as IUserDTO;
    yield put(actions.clientActions.fetchUserData.success(_response));
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
    const { data, message } = (yield call(client.uploadUserImage, image)) as MessageReply<ImageType>;
    yield put(actions.clientActions.uploadUserImage.success(data));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded({ message }));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.clientActions.uploadUserImage.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}

// WATHCERS ------------
function* loginFlow() {
  // let client = yield recall<AuthResponse>('client');
  while (true) {
    // if (!client) {
      const { payload }: { payload: AuthParams } = yield take(getType(actions.clientActions.authAsync.request));
      yield fork(authWorker, payload);
    // } else {
    //   yield put(actions.clientActions.authAsync.success(client));
    // }
  }
}
function* logoutFlow() {
  while (true) {
    yield take(getType(actions.clientActions.logout))
    yield forget('client')
    history.push(appRoutes.MAIN_PAGE.absolutePath)
    window.location.reload()
  }
}
function* watchRegisterWorker() {
  while (true) {
    const { payload }: { payload: IRegistrationModel } = yield take(getType(actions.clientActions.register.request));
    yield fork(registerWorker, payload);
  }
}
function* watchConfirmationWorker() {
  while (true) {
    const { payload: token }: { payload: string } = yield take(getType(actions.clientActions.confirm.request));
    yield fork(confirmationWorker, token);
  }
}
function* watchLoadUserData() {
  while (true) {
    yield take(getType(actions.clientActions.fetchUserData.request));
    const data = (yield select(getUserData)) as Nullable<User>;
    if (!data) yield fork(loadUserData);
    else yield put(actions.clientActions.fetchUserData.success(data))
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
    fork(logoutFlow),
    fork(watchRegisterWorker),
    fork(watchConfirmationWorker),
    fork(watchLoadUserData),
    fork(watchEditUserData),
    fork(watchUploadUserImage),
  ])
}
