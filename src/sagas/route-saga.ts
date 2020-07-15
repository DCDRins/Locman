
import { select, call, all, put, take, fork } from 'redux-saga/effects'
import { IRouteDTO } from '../models';
import { routes as api } from '../services/api';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import handleErrors from './subroutines/handleErrors';
import { Message, IFetchParams, Pagination } from '../.types/types';
import { ServerResponse } from '../services/api/types';
import { getCurrentRoute } from '../selectors/route-selectors';


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


export default function* watcher() {
  yield all([
    fork(watchLoadAcceptedRouteList),
    fork(watchLoadCurrentRoute),
  ])
}
