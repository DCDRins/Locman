import { createAsyncAction } from 'typesafe-actions';
import { IRouteDTO, IEventDTO, IRoute } from '../models';
import { Message, Pagination, Nullable, MessageReply, HasCodeParams } from '../.types/types';

export const fetchRouteAsync = createAsyncAction(
  '@@routes/current/request',
  '@@routes/current/success',
  '@@routes/current/failure',
  '@@routes/current/cancel',
)<string, IRouteDTO, Message>();

// export const fetchRouteListAsync = createAsyncAction(
//   '@@routes/FETCH_ROUTE_LIST_REQUEST_START',
//   '@@routes/FETCH_ROUTE_LIST_REQUEST_SUCCESS',
//   '@@routes/FETCH_REQUEST_LIST_REQUEST_ERROR',
//   '@@routes/FETCH_ROUTE_LIST_REQUEST_CANCEL',
// )<{}, Pagination<IRouteDTO>, Message>();

export const fetchAcceptedRouteList = createAsyncAction(
  '@@routes/list/accepted/request',
  '@@routes/list/accepted/success',
  '@@routes/list/accepted/failure',
  '@@routes/list/accepted/cancel',
)<{}, Pagination<IRouteDTO>, Message>();

export const fetchCurrentRoute = createAsyncAction(
  '@@routes/current/request',
  '@@routes/current/success',
  '@@routes/current/failure',
  '@@routes/current/cancel',
)<{}, IRouteDTO, Message>();

export const fetchRouteEventList = createAsyncAction(
  '@@routes/eventlist/request',
  '@@routes/eventlist/success',
  '@@routes/eventlist/failure',
  '@@routes/eventlist/cancel',
)<{}, Nullable<Pagination<IEventDTO>>, Message>();

export const fetchUserRouteList = createAsyncAction(
  '@@routes/list/created/request',
  '@@routes/list/created/success',
  '@@routes/list/created/failure',
  '@@routes/list/created/cancel',
)<{}, Nullable<Pagination<IRouteDTO>>, Message>();

export const createRoute = createAsyncAction(
  '@@routes/create/request',
  '@@routes/create/success',
  '@@routes/create/failure',
  '@@routes/create/cancel',
)<IRoute, MessageReply<IRouteDTO>, Message>();

export const editRoute = createAsyncAction(
  '@@routes/edit/request',
  '@@routes/edit/success',
  '@@routes/edit/failure',
  '@@routes/edit/cancel',
)<IRoute, Message, Message>();

export const deleteRoute = createAsyncAction(
  '@@routes/delete/request',
  '@@routes/delete/success',
  '@@routes/delete/failure',
  '@@routes/delete/cancel',
)<string, Message, Message>();

export const uploadImageAsync = createAsyncAction(
  '@@routes/image/upload/request',
  '@@routes/image/upload/success',
  '@@routes/image/upload/failure',
  '@@routes/image/upload/cancel',
)<string, Message, Message>();
