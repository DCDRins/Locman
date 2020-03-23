// ./src/store/heroes/sagas.ts

import { select, call, put, take, fork, all } from 'redux-saga/effects'
import { Pagination, IFetchParams, Message, MessageReply, ErrorReply, HasSearchParams, HasStringParams } from '../.types/types';
import { IEventDTO, IEvent, Tag } from '../models';
import { getType } from 'typesafe-actions';
import { event as api, transformResponse } from '../services/api';
import handleErrors from './subroutines/handleErrors';
import * as actions from '../actions';
import {
  somethingIsLoading,
  somethingIsSuccessfullyLoaded,
  somethingIsThrowException,
} from '../actions/system-actions';
import { selectTags } from '../selectors/event-selectors';
import { ServerResponse } from '../services/api/types';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


function* loadEvent(charCode: string | number): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchEventByCharCode, charCode)) as IEventDTO;
    yield put(actions.eventActions.fetchEventAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.fetchEventAsync.failure(response));
  }
}
function* loadEventList(params: IFetchParams): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchEventList, params)) as Pagination<IEventDTO>;
    yield put(actions.eventActions.fetchEventListAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.fetchEventListAsync.failure(response));
  }
}
function* loadUserEventList(params: IFetchParams): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.fetchUserEventList, params)) as Pagination<IEventDTO>;
    yield put(actions.eventActions.fetchUserEventListAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.fetchUserEventListAsync.failure(response));
  }
}
function* createEvent(params: IEvent): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.createEvent, params)) as MessageReply<IEventDTO>;
    yield put(actions.eventActions.createEventAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.createEventAsync.failure(response));
  }
}
function* editEvent(params: IEvent): Generator {
  try {
    const response = (yield call(api.editEvent, params)) as MessageReply<IEventDTO>;
    yield put(actions.eventActions.editEventAsync.success(response));
    yield put(somethingIsSuccessfullyLoaded(response))
  } catch ({ response }) {
    const _response = transformResponse<ErrorReply>(response)
    yield put(actions.eventActions.editEventAsync.failure(_response));
    yield put(somethingIsThrowException(_response))
  }
}
function* deleteEvent(charCode: string): Generator {
  // here cache functions 
  try {
    const response = (yield call(api.deleteEvent, charCode)) as Message;
    yield put(actions.eventActions.deleteEventAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.deleteEventAsync.failure(response));
  }
}
function* fetchTagList(params: HasSearchParams): Generator {
  try {
    const response = (yield call(api.fetchTagList, params)) as Pagination<Tag>;
    yield put(actions.eventActions.fetchTagListAsync.success(response));
  } catch ({ response }) {
    yield put(actions.eventActions.fetchTagListAsync.failure(response));
  }
}

function* uploadImage(charCode, image: File): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(api.uploadImage, charCode, image)) as Message;
    // yield put(actions.eventActions.uploadImageAsync.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    // yield put(actions.eventActions.uploadImageAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}


// WATCHERS ---

function* watchLoadEvent() {
  while (true) {
    const { payload: charCode }: { payload: string | number } = yield take(getType(actions.eventActions.fetchEventAsync.request));
    yield fork(loadEvent, charCode);
  }
}
function* watchLoadEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.eventActions.fetchEventListAsync.request));
    yield fork(loadEventList, params);
  }
}
function* watchLoadUserEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.eventActions.fetchUserEventListAsync.request));
    yield fork(loadUserEventList, params);
  }
}
function* watchCreateEvent() {
  while (true) {
    const { payload: params }: { payload: IEvent } = yield take(getType(actions.eventActions.createEventAsync.request));
    yield fork(createEvent, params);
  }
}
function* watchEditEvent() {
  while (true) {
    const { payload: params }: { payload: IEvent } = yield take(getType(actions.eventActions.editEventAsync.request));
    yield put(somethingIsLoading())
    yield fork(editEvent, params);
  }
}
function* watchDeleteEvent() {
  while (true) {
    const { payload: charCode }: { payload: string } = yield take(getType(actions.eventActions.deleteEventAsync.request));
    yield fork(deleteEvent, charCode);
  }
}
function* watchLoadTagList() {
  while (true) {
    const { payload: params }: { payload: HasSearchParams } = yield take(getType(actions.eventActions.fetchTagListAsync.request));
    const data = (yield select(selectTags)) as Pagination<Tag>;
    if (data) {
      yield put(actions.eventActions.fetchTagListAsync.success(data))
    } else { 
      yield fork(fetchTagList, params);
    }
    yield fork(fetchTagList, params);
  }
}
function* watchUploadImage() {
  while (true) {
    const { payload: { code, data } }: { payload: HasStringParams<File> } = yield take(getType(actions.eventActions.uploadImageAsync.request));
    yield fork(uploadImage, code, data);
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
    fork(watchLoadTagList),
    fork(watchUploadImage),
  ])
}