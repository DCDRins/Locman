
import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchRouteListAsync } from '../actions/route-actions'
import { IRouteDTO } from '../models';
import { routes } from '../services/api';
import { getType } from 'typesafe-actions';


// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


// function* fetchRoute(action: ReturnType<typeof fetchRouteListAsync.request>): Generator {
//   try {
//     const response = (yield call(routes.get, action.payload)) as IRouteDTO[];

//     yield put(fetchRouteListAsync.success(response));
//   } catch (err) {
//     yield put(fetchRouteListAsync.failure(err));
//   }
// }

function* fetchRouteList(action: ReturnType<typeof fetchRouteListAsync.request>): Generator {
  try {
    const response = (yield call(routes.getAll)) as IRouteDTO[];

    yield put(fetchRouteListAsync.success(response));
  } catch (err) {
    yield put(fetchRouteListAsync.failure(err));
  }
}


export default function* watcher() {
  yield takeEvery(getType(fetchRouteListAsync.request), fetchRouteList)
}
