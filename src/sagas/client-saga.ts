// ./src/store/heroes/sagas.ts

import { call, put, takeLatest, all } from 'redux-saga/effects'
import { client } from '../services/api';
import { authAsync, refreshAsync } from '../actions/client-actions'
import { AuthResponse } from '../models';
import { getType } from 'typesafe-actions';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* authWorker(action: ReturnType<typeof authAsync.request>): Generator {
  try {
    const response = (yield call(client.auth, action.payload)) as AuthResponse;
    
    // dispatch a success action to the store
    yield put(authAsync.success(response));
    
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put(authAsync.failure(err));
  }
}
function* refreshWorker(action: ReturnType<typeof refreshAsync.request>): Generator {
  try {
    const response = (yield call(client.refresh)) as AuthResponse;
    
    // dispatch a success action to the store
    yield put(refreshAsync.success(response));
    
  } catch (err) {
    // dispatch a failure action to the store with the error
    yield put(refreshAsync.failure(err));
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
// export default function* authRequestWatcher() {
export default function* () {
  yield all([
    takeLatest(getType(authAsync.request), authWorker),
    takeLatest(getType(refreshAsync.request), refreshWorker)
  ])
}
// export function* refreshRequestWatcher() {
//   yield takeLatest(getType(refreshAsync.request), refreshWorker)
// }
