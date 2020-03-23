import { createAsyncAction } from 'typesafe-actions';
import { IEventDTO, IEvent, Tag } from '../models';
import { IFetchParams, Pagination, MessageReply, Message, ErrorReply, HasSearchParams, HasStringParams } from '../.types/types';


export const fetchEventAsync = createAsyncAction(
  '@@event/fetch/request',
  '@@event/fetch/success',
  '@@event/fetch/failure',
  '@@event/fetch/cancel',
)<string | number, IEventDTO, Error>();

export const fetchEventListAsync = createAsyncAction(
  '@@event/fetch list/request',
  '@@event/fetch list/success',
  '@@event/fetch list/failure',
  '@@event/fetch list/cancel',
)<IFetchParams, Pagination<IEventDTO>, Error>();

export const fetchUserEventListAsync = createAsyncAction(
  '@@event/fetch list(user)/request',
  '@@event/fetch list(user)/success',
  '@@event/fetch list(user)/failure',
  '@@event/fetch list(user)/cancel',
)<IFetchParams, Pagination<IEventDTO>, Error>();

export const createEventAsync = createAsyncAction(
  '@@event/create/request',
  '@@event/create/success',
  '@@event/create/failure',
  '@@event/create/cancel',
)<IEvent, MessageReply<IEventDTO>, Error>();

export const editEventAsync = createAsyncAction(
  '@@event/edit/request',
  '@@event/edit/success',
  '@@event/edit/failure',
  '@@event/edit/cancel',
)<IEvent, Message, ErrorReply>();

export const deleteEventAsync = createAsyncAction(
  '@@event/delete/request',
  '@@event/delete/success',
  '@@event/delete/failure',
  '@@event/delete/cancel',
)<string, Message, Error>();

export const uploadImageAsync = createAsyncAction(
  '@@event/image upload/request',
  '@@event/image upload/success',
  '@@event/image upload/failure',
  '@@event/image upload/cancel',
)<HasStringParams<File>, Message, Error>();

export const fetchTagListAsync = createAsyncAction(
  '@@tags/fetch/request',
  '@@tags/fetch/success',
  '@@tags/fetch/failure',
  '@@tags/fetch/cancel',
)<HasSearchParams, Pagination<Tag>, Error>();
