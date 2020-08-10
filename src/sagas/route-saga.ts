
import { select, call, all, put, take, fork } from 'redux-saga/effects'
import { IRouteDTO, IRoute } from '../models';
import { routes as api } from '../services/api';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import handleErrors from './subroutines/handleErrors';
import { Message, IFetchParams, Pagination, Nullable, ErrorReply, MessageReply, HasCodeParams } from '../.types/types';
import { ServerResponse } from '../services/api/types';
import { getCurrentRoute, userRouteListComparison, selectUserRouteList } from '../selectors/route-selectors';


// function* fetchRoute(action: ReturnType<typeof fetchRouteListAsync.request>): Generator {
//   try {
//     const response = (yield call(routes.get, action.payload)) as IRouteDTO[];

//     yield put(fetchRouteListAsync.success(response));
//   } catch (err) {
//     yield put(fetchRouteListAsync.failure(err));
//   }
// }

// function* fetchRouteList(action: ReturnType<typeof fetchRouteListAsync.request>): Generator {
//   try {
//     const response = (yield call(api.getAll)) as IRouteDTO[];
//     yield put(fetchRouteListAsync.success(response));
//   } catch (err) {
//     yield put(fetchRouteListAsync.failure(err));
//   }
// }


function* loadCurrentRoute(): Generator {
  try {
    const response = (yield call(api.fetchCurrentRoute)) as IRouteDTO;
    yield put(actions.routeActions.fetchCurrentRoute.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.routeActions.fetchCurrentRoute.failure(data));
  }
}
function* loadAcceptedRouteList(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchRouteList, params)) as Pagination<IRouteDTO>;
    yield put(actions.routeActions.fetchAcceptedRouteList.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<Message>;
    yield handleErrors(status)
    yield put(actions.routeActions.fetchAcceptedRouteList.failure(data));
  }
}
function* loadUserRouteList(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchUserRouteList, params)) as Nullable<Pagination<IRouteDTO>>;
    const data = (yield select(userRouteListComparison, response)) as Nullable<Pagination<IRouteDTO>>;
    yield put(actions.routeActions.fetchUserRouteList.success(data));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.routeActions.fetchUserRouteList.failure(data));
  }
}
function* createRoute(params: IRoute): Generator {
  try {
    const response = (yield call(api.createRoute, params)) as MessageReply<IRouteDTO>;
    // yield put(actions.eventActions.fetchManagedEventListAsync.request({ onPage: previewItemsCount }));
    yield put(actions.routeActions.createRoute.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.routeActions.createRoute.failure(data));
  }
}
function* editRoute(params: IRoute): Generator {
  try {
    const response = (yield call(api.editRoute, params)) as Message;
    yield put(actions.routeActions.editRoute.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.routeActions.editRoute.failure(data));
  }
}
function* deleteRoute(charCode: string): Generator {
  try {
    const response = (yield call(api.deleteRoute, charCode)) as Message;
    yield put(actions.routeActions.deleteRoute.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.routeActions.deleteRoute.failure(data));
  }
}
function* uploadImage(charCode, image: File): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(api.uploadImage, charCode, image)) as MessageReply<{ id: number; path: string; }>;
    yield put(actions.routeActions.uploadImageAsync.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.routeActions.uploadImageAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}
// WATCHERS ---

// function* watchLoadRouteList() {
//   while (true) {
//     const { payload }: { payload } = yield take(getType(actions.eventActions.fetchEventAsync.request));
//     // yield fork(loadEvent, charCode);
//   }
// }
function* watchLoadCurrentRoute() {
  while (true) {
    yield take(getType(actions.routeActions.fetchCurrentRoute.request));
    const data = (yield select(getCurrentRoute)) as IRouteDTO;
    if (data) yield put(actions.routeActions.fetchCurrentRoute.success(data));
    else yield fork(loadCurrentRoute);
  }
}
function* watchLoadAcceptedRouteList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.routeActions.fetchAcceptedRouteList.request));
    yield fork(loadAcceptedRouteList, params);
  }
}
function* watchLoadUserRouteList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.routeActions.fetchUserRouteList.request));
    const data = (yield select(selectUserRouteList, params)) as Nullable<Pagination<IRouteDTO>>
    if (data) yield put(actions.routeActions.fetchUserRouteList.success(data))
    else yield fork(loadUserRouteList, params);
  }
}
function* watchCreateRoute() {
  while (true) {
    const { payload: params }: { payload: IRoute } = yield take(getType(actions.routeActions.createRoute.request));
    yield fork(createRoute, params);
  }
}
function* watchEditRoute() {
  while (true) {
    const { payload: params }: { payload: IRoute } = yield take(getType(actions.routeActions.editRoute.request));
    yield fork(editRoute, params);
  }
}
function* watchDeleteRoute() {
  while (true) {
    const { payload: charCode }: { payload: string } = yield take(getType(actions.routeActions.deleteRoute.request));
    yield fork(deleteRoute, charCode);
  }
}
function* watchUploadImage() {
  while (true) {
    const { payload: { code, data } }: { payload: HasCodeParams<File> } = yield take(getType(actions.routeActions.uploadImageAsync.request));
    yield fork(uploadImage, code, data);
  }
}


export default function* watcher() {
  yield all([
    fork(watchLoadAcceptedRouteList),
    fork(watchLoadCurrentRoute),
    fork(watchLoadUserRouteList),
    fork(watchCreateRoute),
    fork(watchEditRoute),
    fork(watchDeleteRoute),
    fork(watchUploadImage),
  ])
}
