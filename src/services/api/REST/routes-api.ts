import { IRouteDTO } from '../../../models';
import api from '../agent';
import { ServerResponse } from '../types';
import { responseLogger } from '../utils';

export const routes = {
  get: (id: string) =>
    api.get<IRouteDTO>(`/user/route/${id}`, {
      transformResponse: (r: ServerResponse<IRouteDTO>) => r && r.data
    }).then(responseLogger),
  getAll: (pageNumber?: number  ) =>
    api.get<IRouteDTO[]>('/user/route', {
      transformResponse: (r: ServerResponse<IRouteDTO[]>) => r && r.data
    }).then(responseLogger),
};
