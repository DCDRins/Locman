// ./src/store/heroes/sagas.ts

import { call, put, take, fork, all } from 'redux-saga/effects'
import { IEventDTO, Pagination, IFetchParams, IEvent, Message, MessageReply } from '../models';
import { getType } from 'typesafe-actions';
import { event as api } from '../services/api';
import {
  fetchEventAsync,
  fetchEventListAsync,
  createEventAsync,
  editEventAsync,
  deleteEventAsync,
  fetchUserEventListAsync,  
} from '../actions/event-actions';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


function* loadEvent(charCode: string | number): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchEventByCharCode, charCode)) as IEventDTO;
    yield put(fetchEventAsync.success(response));
  } catch ({ response }) {
    yield put(fetchEventAsync.failure(response));
  }
}
function* loadEventList(params: IFetchParams): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchEventList, params)) as Pagination<IEventDTO>;
    yield put(fetchEventListAsync.success(response));
  } catch ({ response }) {
    yield put(fetchEventListAsync.failure(response));
  }
}
function* loadUserEventList(params: IFetchParams): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchUserEventList, params)) as Pagination<IEventDTO>;
    yield put(fetchUserEventListAsync.success(response));
  } catch ({ response }) {
    yield put(fetchUserEventListAsync.failure(response));
  }
}
function* createEvent(params: IEvent): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.createEvent, params)) as MessageReply<IEventDTO>;
    yield put(createEventAsync.success(response));
  } catch ({ response }) {
    yield put(createEventAsync.failure(response));
  }
}
function* editEvent(params: IEvent): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.editEvent, params)) as Message;
    yield put(editEventAsync.success(response));
  } catch ({ response }) {
    yield put(editEventAsync.failure(response));
  }
}
function* deleteEvent(charCode: string): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.deleteEvent, charCode)) as Message;
    yield put(deleteEventAsync.success(response));
  } catch ({ response }) {
    yield put(deleteEventAsync.failure(response));
  }
}


// WATCHERS ---

function* watchLoadEvent() {
  while (true) {
    const { payload: charCode }: { payload: string | number } = yield take(getType(fetchEventAsync.request));
    yield fork(loadEvent, charCode);
  }
}
function* watchLoadEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(fetchEventListAsync.request));
    yield fork(loadEventList, params);
  }
}
function* watchLoadUserEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(fetchUserEventListAsync.request));
    yield fork(loadUserEventList, params);
  }
}
function* watchCreateEvent() {
  while (true) {
    const { payload: params }: { payload: IEvent } = yield take(getType(createEventAsync.request));
    yield fork(createEvent, params);
  }
}
function* watchEditEvent() {
  while (true) {
    const { payload: params }: { payload: IEvent } = yield take(getType(editEventAsync.request));
    yield fork(editEvent, params);
  }
}
function* watchDeleteEvent() {
  while (true) {
    const { payload: charCode }: { payload: string } = yield take(getType(deleteEventAsync.request));
    yield fork(deleteEvent, charCode);
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
export default function* () {
  yield all([
    fork(watchLoadEvent),
    fork(watchLoadEventList),
    fork(watchLoadUserEventList),
    fork(watchCreateEvent),
    fork(watchEditEvent),
    fork(watchDeleteEvent),
  ])
}