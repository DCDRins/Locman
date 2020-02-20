// ./src/store/heroes/sagas.ts

import { call, put, take, fork, all } from 'redux-saga/effects'
import { IArticleDTO, Pagination, ICategoryDTO, IFetchParams, MessageReply, IArticle, Message } from '../models';
import { getType } from 'typesafe-actions';
import { knowledge as api } from '../services/api';
import {
  fetchArticleListAsync,
  fetchCategoriesAsync,
  fetchArticleAsync,
  createArticleAsync,
  createCategoryAsync,
  editArticleAsync,
  deleteArticleAsync,
  deleteCategoryAsync,
} from '../actions/knowledge-actions';

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


function* loadArticle(charCode: string | number): Generator {
  // const article = yield selectState<IArticleDTO>(getArticle, charCode);
  // if (!article) {
  // }
  try {
    const response = (yield call(api.fetchArticleByCharCode, charCode)) as IArticleDTO;
    yield put(fetchArticleAsync.success(response));
  } catch ({ response }) {
    yield put(fetchArticleAsync.failure(response));
  }
}

function* loadArticleList(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchArticleList, params)) as Pagination<IArticleDTO>;
    yield put(fetchArticleListAsync.success(response));
  } catch ({ response }) {
    // yield put(fetchArticleListAsync.failure(response));
  }
}

function* loadCategories(params: IFetchParams): Generator {
  try {
    const response = (yield call(api.fetchCategoriesList, params)) as Pagination<ICategoryDTO> | any; // tree type here
    yield put(fetchCategoriesAsync.success(response));
  } catch ({ response }) {
    yield put(fetchCategoriesAsync.failure(response));
  }
}

function* createArticle(article: IArticle): Generator {
  try {
    const response = (yield call(api.createArticle, article)) as MessageReply<IArticleDTO>;
    yield put(createArticleAsync.success(response));
  } catch ({ response }) {
    yield put(createArticleAsync.failure(response))
  }
}

function* createCategory(category: ICategoryDTO): Generator {
  try {
    const response = (yield call(api.createCategory, category)) as MessageReply<ICategoryDTO>;
    yield put(createCategoryAsync.success(response));
  } catch ({ response }) {
    yield put(createCategoryAsync.failure(response));
  }
}

function* editArticle(editedArticle: IArticle): Generator {
  try {
    const response = (yield call(api.editArticle, editedArticle)) as MessageReply<IArticleDTO>;
    yield put(editArticleAsync.success(response));
  } catch (e) {
    yield put(editArticleAsync.failure(e));
  }
}

function* deleteArticle(charCode: string): Generator {
  try {
    const response = (yield call(api.deleteArticle, charCode)) as Message;
    yield put(deleteArticleAsync.success(response));
  } catch ({ response }) {
    yield put(deleteArticleAsync.failure(response));
  }
}

function* deleteCategory(params: string | number[]): Generator {
  try {
    const response = (yield call(api.deleteCategory, params)) as Message;
    yield put(deleteCategoryAsync.success(response));
  } catch ({ response }) {
    yield put(deleteCategoryAsync.failure(response));
  }
}

// WATCHERS ---

function* watchLoadBaseArticle() {
  while (true) {
    const { payload: charCode}: { payload: string | number } = yield take(getType(fetchArticleAsync.request));
    yield fork(loadArticle, charCode);
  }
}

function* watchLoadBaseArticleList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(fetchArticleListAsync.request));
    yield fork(loadArticleList, params)
  }
}

function* watchLoadBaseCategories() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(fetchCategoriesAsync.request));
    yield fork(loadCategories, params);
  }
}

function* watchCreateBaseArticle() {
  while (true) {
    const { payload: article }: { payload: IArticle } = yield take(getType(createArticleAsync.request));
    yield fork(createArticle, article);
  }
}

function* watchCreateBaseCategory() {
  while (true) {
    const { payload: category }: { payload: ICategoryDTO } = yield take(getType(createCategoryAsync.request));
    yield fork(createCategory, category);
  }
}

function* watchEditBaseArticle() {
  while (true) {
    const { payload: article }: { payload: IArticle } = yield take(getType(editArticleAsync.request));
    yield fork(editArticle, article);
  }
}

function* watchDeleteBaseArticle() {
  while (true) {
    const { payload: { characterCode: charCode }}: { payload: IArticleDTO } = yield take(getType(deleteArticleAsync.request));
    yield fork(deleteArticle, charCode);
  }
}

function* watchDeleteBaseCategory() {
  while (true) {
    const { payload }: { payload: string | number[] } = yield take(getType(deleteCategoryAsync.request));
    yield fork(deleteCategory, payload);
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
export default function* () {
  yield all([
    fork(watchLoadBaseArticle),
    fork(watchLoadBaseArticleList),
    fork(watchLoadBaseCategories),
    fork(watchCreateBaseArticle),
    fork(watchCreateBaseCategory),
    fork(watchEditBaseArticle),
    fork(watchDeleteBaseArticle),
    fork(watchDeleteBaseCategory),
  ])
}