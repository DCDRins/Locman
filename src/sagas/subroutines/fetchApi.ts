import { put, call } from 'redux-saga/effects'

// cannot bind this functions because of less types
export function* fetchEntity<T>(action, apiFn, payload): Generator {
  try {
    const response = (yield call(apiFn, payload)) as T;
    yield put(action.success(response));
  } catch (error) {
    yield put(action.failure(error));
  }
  // todo -> make cancellable
}