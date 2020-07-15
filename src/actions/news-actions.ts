import { createAsyncAction } from 'typesafe-actions';
import { ISliderNewsDTO, INewsDTO } from '../models';
import { IFetchParams, Pagination, Message, Nullable } from '../.types/types';

export const fetchSliderNews = createAsyncAction(
  '@@slider/news/fetch/request',
  '@@slider/news/fetch/success',
  '@@slider/news/fetch/failure',
  '@@slider/news/fetch/cancel',
)<{}, Nullable<ISliderNewsDTO[]>, {}>();

export const fetchNewsList = createAsyncAction(
  '@@news/fetch/request',
  '@@news/fetch/success',
  '@@news/fetch/failure',
  '@@news/fetch/cancel',
)<IFetchParams, Nullable<Pagination<INewsDTO>>, Message>();
