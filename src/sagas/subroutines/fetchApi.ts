import { put, call } from 'redux-saga/effects'
import handleErrors from './handleErrors';

// cannot bind this functions because of less types
export function* callAsyncAction<T>(action, apiFn, payload?): Generator {
  try {
    const response = (yield call(apiFn, payload)) as T;
    yield put(action.success(response));
  } catch ({ response }) {
    const { status, data } = response;
    yield handleErrors(status);
    yield put(action.failure(data));
  }
  // todo -> make cancellable
}