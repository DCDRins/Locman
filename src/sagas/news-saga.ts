import { select, call, put, take, fork, all } from 'redux-saga/effects'
import { ISliderNewsDTO, INewsDTO } from '../models';
import { getType } from 'typesafe-actions';
import { news } from '../services/api';
import * as actions from '../actions';
import { IFetchParams, Pagination, Nullable, ErrorReply } from '../.types/types';
import handleErrors from './subroutines/handleErrors';
import { ServerResponse } from '../services/api/types';
import { selectSliderNews, selectNewsList, newsListComparison } from '../selectors/news-selectors';

function* loadSliderNews(): Generator {
  try {
    const response = (yield call(news.fetchSliderNews)) as ISliderNewsDTO[];
    yield put(actions.newsActions.fetchSliderNews.success(response));
  } catch ({ response }) {
    yield put(actions.newsActions.fetchSliderNews.failure(response));
  }
}

function* loadNewsList(params: IFetchParams): Generator {
  try {
    const response = (yield call(news.fetchNewsList, params)) as Nullable<Pagination<INewsDTO>>;
    const data = (yield select(newsListComparison, response)) as Nullable<Pagination<INewsDTO>>;
    yield put(actions.newsActions.fetchNewsList.success(data));
  } catch ({ response }) {
    const { status, data } = response as ServerResponse<ErrorReply>
    handleErrors(status);
    yield put(actions.newsActions.fetchNewsList.failure(data));
  }
}

// WATCHERS ----------

function* watchLoadSliderNews() {
  while (true) {
    yield take(getType(actions.newsActions.fetchSliderNews.request));
    const data = (yield select(selectSliderNews)) as Nullable<ISliderNewsDTO[]>
    if (data) yield put(actions.newsActions.fetchSliderNews.success(data))
    else yield fork(loadSliderNews);
  }
}
function* watchLoadNewsList() {
  while (true) {
    const { payload: params }: { payload: IFetchParams } = yield take(getType(actions.newsActions.fetchNewsList.request));
    const data = (yield select(selectNewsList, params)) as Nullable<Pagination<INewsDTO>>
    if (data) yield put(actions.newsActions.fetchNewsList.success(data))
    else yield fork(loadNewsList, params);
  }
}

export default function* () {
  yield all([
    fork(watchLoadSliderNews),
    fork(watchLoadNewsList),
  ])
}