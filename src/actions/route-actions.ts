import { createAsyncAction } from 'typesafe-actions';
import { IRouteDTO } from '../models';

export const fetchRouteAsync = createAsyncAction(
  '@@routes/FETCH_ROUTE_REQUEST_START',
  '@@routes/FETCH_ROUTE_REQUEST_SUCCESS',
  '@@routes/FETCH_REQUEST_REQUEST_ERROR',
  '@@routes/FETCH_ROUTE_REQUEST_CANCEL',
)<string, IRouteDTO, Error>();

export const fetchRouteListAsync = createAsyncAction(
  '@@routes/FETCH_ROUTE_LIST_REQUEST_START',
  '@@routes/FETCH_ROUTE_LIST_REQUEST_SUCCESS',
  '@@routes/FETCH_REQUEST_LIST_REQUEST_ERROR',
  '@@routes/FETCH_ROUTE_LIST_REQUEST_CANCEL',
)<string, IRouteDTO[], Error>();

// export const fetch = createAction("ASD", (id: number) => ({
//   id,
// }))<IRouteDTO>();

// export const update = createAction(FETCH_ALL)<Array<Route>>();
// export const fetch_all = createAsyncAction(FETCH_ALL)<any>();
