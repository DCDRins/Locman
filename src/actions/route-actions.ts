import { createAsyncAction } from 'typesafe-actions';
import { IRouteDTO, IEventDTO } from '../models';
import { Message, Pagination, Nullable } from '../.types/types';

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

