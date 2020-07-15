import { select, call, put, take, fork, all } from 'redux-saga/effects'
import { getType } from 'typesafe-actions';
import { Pagination, IFetchParams, Message, MessageReply, ErrorReply, HasCodeParams, Nullable } from '../.types/types';
import { IEventDTO, IEvent, ClosestEvent } from '../models';
import { event as api } from '../services/api';
import handleErrors from './subroutines/handleErrors';
import * as actions from '../actions';
import {
  selectEvent,
  selectManagedEventList,
  selectStockEventList,
  stockEventListComparison,
  managedEventListComparison,
} from '../selectors/event-selectors';
import {
  somethingIsLoading,
  somethingIsSuccessfullyLoaded,
  somethingIsThrowException,
} from '../actions/system-actions';
import { ServerResponse } from '../services/api/types';
import { onPageItemsCount } from '../common/constants';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


function* loadEvent(charCode: string | number): Generator {
  try {
    const response = (yield call(api.fetchEventByCharCode, charCode)) as IEventDTO;
    yield put(actions.eventActions.fetchEventAsync.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.eventActions.fetchEventAsync.failure(data));
  }
}
function* loadStockEventList(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchEventList, params)) as Nullable<Pagination<IEventDTO>>;
    const data = (yield select(stockEventListComparison, response)) as Nullable<Pagination<IEventDTO>>;
    yield put(actions.eventActions.fetchStockEventListAsync.success(data));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.eventActions.fetchStockEventListAsync.failure(data));
  }
}
function* loadManagedEventList(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchManagedEventList, params)) as Nullable<Pagination<IEventDTO>>;
    const data = (yield select(managedEventListComparison, response)) as Nullable<Pagination<IEventDTO>>;
    yield put(actions.eventActions.fetchManagedEventListAsync.success(data));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.eventActions.fetchManagedEventListAsync.failure(data));
  }
}
function* createEvent(params: IEvent): Generator {
  try {
    yield put(somethingIsLoading())
    const response = (yield call(api.createEvent, params)) as MessageReply<IEventDTO>;
    yield put(actions.eventActions.createEventAsync.success(response));
    yield put(actions.eventActions.fetchManagedEventListAsync.request({ onPage: onPageItemsCount }));
    yield put(somethingIsSuccessfullyLoaded(response))
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.eventActions.createEventAsync.failure(data));
    yield put(somethingIsThrowException(data))
  }
}
function* editEvent(params: IEvent): Generator {
  try {
    yield put(somethingIsLoading())
    const response = (yield call(api.editEvent, params)) as MessageReply<IEventDTO>;
    yield put(actions.eventActions.editEventAsync.success(response));
    yield put(somethingIsSuccessfullyLoaded(response))
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.eventActions.editEventAsync.failure(data));
    yield put(somethingIsThrowException(data))
  }
}
function* deleteEvent(charCode: string): Generator {
  try {
    const response = (yield call(api.deleteEvent, charCode)) as MessageReply<{ id: number }>;
    yield put(actions.eventActions.deleteEventAsync.success(response));
    yield put(somethingIsSuccessfullyLoaded(response))
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.eventActions.deleteEventAsync.failure(response));
    yield put(somethingIsThrowException(data))
  }
}
function* uploadImage(charCode, image: File): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(api.uploadImage, charCode, image)) as MessageReply<{ id: number; path: string; }>;
    yield put(actions.eventActions.uploadImageAsync.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.eventActions.uploadImageAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}

function* uploadImageRange(charCode, images: FileList): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(api.uploadImageRange, charCode, images)) as MessageReply<{ event: number; images: Array<{ id: number, path: string }>; }>;
    yield put(actions.eventActions.uploadImageRangeAsync.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.eventActions.uploadImageRangeAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException({ message: "Это изображение нельзя использовать, либо оно слишком большое" }));
  }
}

function* deleteImageFromRange(charCode, id: number): Generator {
  try {
    yield put(actions.systemActions.somethingIsLoading());
    const response = (yield call(api.deleteImageFromRange, charCode, id)) as MessageReply<{ event: number; image: number }>;
    yield put(actions.eventActions.deleteImageFromRangeAsync.success(response));
    yield put(actions.systemActions.somethingIsSuccessfullyLoaded(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.eventActions.deleteImageFromRangeAsync.failure(data));
    yield put(actions.systemActions.somethingIsThrowException(data));
  }
}

function* loadClosestEvent(): Generator {
  try {
    const response = (yield call(api.fetchClosestEvent)) as ClosestEvent;
    yield put(actions.eventActions.fetchClosestEvent.success(response));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>;
    yield handleErrors(status)
    yield put(actions.eventActions.fetchClosestEvent.failure(data));
  }
}

// function* loadFreshEventList(params: IFetchParams): Generator {
//   try {
//     const response = (yield call(api.fetchEventList, params)) as Nullable<Pagination<IEventDTO>>;
//     yield put(actions.eventActions.fetchFreshEventList.success(response));
//   } catch ({ response }) {
//     const { status, data } = response as ServerResponse<ErrorReply>;
//     yield handleErrors(status)
//     yield put(actions.eventActions.fetchFreshEventList.failure(data));
//   }
// }

// WATCHERS ---

function* watchLoadEvent() {
  while (true) {
    const { payload: charCode }: { payload: string | number } = yield take(getType(actions.eventActions.fetchEventAsync.request));
    const data = (yield select(selectEvent, charCode)) as Nullable<IEventDTO>;
    if (data)
      yield put(actions.eventActions.fetchEventAsync.success(data))
    else
      yield fork(loadEvent, charCode);
  }
}
function* watchLoadStockEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.eventActions.fetchStockEventListAsync.request));
    const data = (yield select(selectStockEventList, params)) as Nullable<Pagination<IEventDTO>>
    if (data) yield put(actions.eventActions.fetchStockEventListAsync.success(data))
    else yield fork(loadStockEventList, params);
  }
}
function* watchLoadManagedEventList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.eventActions.fetchManagedEventListAsync.request));
    const data = (yield select(selectManagedEventList, params)) as Nullable<Pagination<IEventDTO>>
    if (data) yield put(actions.eventActions.fetchManagedEventListAsync.success(data))
    else yield fork(loadManagedEventList, params);
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
    yield fork(editEvent, params);
  }
}
function* watchDeleteEvent() {
  while (true) {
    const { payload: charCode }: { payload: string } = yield take(getType(actions.eventActions.deleteEventAsync.request));
    yield fork(deleteEvent, charCode);
  }
}
function* watchUploadImage() {
  while (true) {
    const { payload: { code, data } }: { payload: HasCodeParams<File> } = yield take(getType(actions.eventActions.uploadImageAsync.request));
    yield fork(uploadImage, code, data);
  }
}
function* watchUploadImageRange() {
  while (true) {
    const { payload: { code, data } }: { payload: HasCodeParams<FileList> } = yield take(getType(actions.eventActions.uploadImageRangeAsync.request));
    yield fork(uploadImageRange, code, data);
  }
}
function* watchDeleteImageFromRange() {
  while (true) {
    const { payload: { code, data: id } }: { payload: HasCodeParams<number> } = yield take(getType(actions.eventActions.deleteImageFromRangeAsync.request));
    yield fork(deleteImageFromRange, code, id);
  }
}
function* watchLoadClosestEvent() {
  while (true) {
    yield take(getType(actions.eventActions.fetchClosestEvent.request));
    yield fork(loadClosestEvent);
  }
}

// function* watchLoadFreshEventList() {
//   while (true) {
//     const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.eventActions.fetchFreshEventList.request));
//     yield fork(loadFreshEventList, params);
//   }
// }

export default function* () {
  yield all([
    fork(watchLoadEvent),
    fork(watchLoadStockEventList),
    fork(watchLoadManagedEventList),
    fork(watchCreateEvent),
    fork(watchEditEvent),
    fork(watchDeleteEvent),
    fork(watchUploadImage),
    fork(watchUploadImageRange),
    fork(watchDeleteImageFromRange),
    fork(watchLoadClosestEvent),
    // fork(watchLoadFreshEventList),
  ])
}