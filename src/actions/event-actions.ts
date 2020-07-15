import { createAsyncAction } from 'typesafe-actions';
import { IEventDTO, IEvent, ClosestEvent } from '../models';
import { IFetchParams, Pagination, MessageReply, Message, ErrorReply, HasCodeParams, Nullable, ImageType } from '../.types/types';


export const fetchEventAsync = createAsyncAction(
  '@@event/fetch/request',
  '@@event/fetch/success',
  '@@event/fetch/failure',
  '@@event/fetch/cancel',
)<string | number, IEventDTO, ErrorReply>();

export const fetchStockEventListAsync = createAsyncAction(
  '@@event/stock list/request',
  '@@event/stock list/success',
  '@@event/stock list/failure',
  '@@event/stock list/cancel',
)<IFetchParams, Nullable<Pagination<IEventDTO>>, ErrorReply>();

export const fetchManagedEventListAsync = createAsyncAction(
  '@@event/managed list/request',
  '@@event/managed list/success',
  '@@event/managed list/failure',
  '@@event/managed list/cancel',
)<IFetchParams, Nullable<Pagination<IEventDTO>>, ErrorReply>();

export const createEventAsync = createAsyncAction(
  '@@event/create/request',
  '@@event/create/success',
  '@@event/create/failure',
  '@@event/create/cancel',
)<IEvent, MessageReply<IEventDTO>, ErrorReply>();

export const editEventAsync = createAsyncAction(
  '@@event/edit/request',
  '@@event/edit/success',
  '@@event/edit/failure',
  '@@event/edit/cancel',
)<IEvent, MessageReply<IEventDTO>, ErrorReply>();

export const deleteEventAsync = createAsyncAction(
  '@@event/delete/request',
  '@@event/delete/success',
  '@@event/delete/failure',
  '@@event/delete/cancel',
)<string, MessageReply<{ id: number }>, Error>();

export const uploadImageAsync = createAsyncAction(
  '@@event/image/request',
  '@@event/image/success',
  '@@event/image/failure',
  '@@event/image/cancel',
)<HasCodeParams<File>, MessageReply<ImageType>, ErrorReply>();

export const uploadImageRangeAsync = createAsyncAction(
  '@@event/image/range/request',
  '@@event/image/range/success',
  '@@event/image/range/failure',
  '@@event/image/range/cancel',
)<HasCodeParams<FileList>, MessageReply<{ event: number, images: Array<{ id: number, path: string }> }>, Message>();

export const deleteImageFromRangeAsync = createAsyncAction(
  '@@event/delete/image/range/request',
  '@@event/delete/image/range/success',
  '@@event/delete/image/range/failure',
  '@@event/delete/image/range/cancel',
)<HasCodeParams<number>, MessageReply<{ event: number, image: number }>, Message>();

export const fetchClosestEvent = createAsyncAction(
  '@@event/closest/request',
  '@@event/closest/success',
  '@@event/closest/failure',
  '@@event/closest/cancel',
)<{}, ClosestEvent, Message>();

// export const fetchFreshEventList = createAsyncAction(
//   '@@event/fresh/request',
//   '@@event/fresh/success',
//   '@@event/fresh/failure',
//   '@@event/fresh/cancel',
// )<IFetchParams, Nullable<Pagination<IEventDTO>>, Message>();

