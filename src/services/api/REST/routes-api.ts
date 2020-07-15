import { IRouteDTO } from '../../../models';
import api from '../agent';
import { transformResponse, responseLogger } from '../utils';
import { Pagination } from '../../../.types/types';

export const routes = {
  fetchRouteList: (params) =>
    api.get<Pagination<IRouteDTO>>('/route', {
      params,
    }).then(r => transformResponse<Pagination<IRouteDTO>>(r)),
  fetchCurrentRoute: () =>
    api.get<IRouteDTO>('/route/main').then(r => transformResponse<IRouteDTO>(r)),
};
