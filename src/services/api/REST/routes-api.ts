import { IRouteDTO, IRoute } from '../../../models';
import api from '../agent';
import { transformResponse } from '../utils';
import { Pagination, Nullable, MessageReply, Message, IFetchParams } from '../../../.types/types';

export const routes = {
  fetchRouteList: (params) =>
    api.get<Pagination<IRouteDTO>>('/route', {
      params,
    }).then(r => transformResponse<Pagination<IRouteDTO>>(r)),
  fetchCurrentRoute: () =>
    api.get<IRouteDTO>('/route/main').then(r => transformResponse<IRouteDTO>(r)),
  fetchUserRouteList: (params: IFetchParams) =>
    api.get<Nullable<Pagination<IRouteDTO>>>('/route/created', {
      params,
    }).then(r => transformResponse<Nullable<Pagination<IRouteDTO>>>(r)),
  createRoute: (data: IRoute) =>
    api.post<MessageReply<IRouteDTO>>(`/route`, data)
    .then(r => transformResponse<MessageReply<IRouteDTO>>(r).data),
  editRoute: (params: IRoute) =>
    api.put<MessageReply<IRouteDTO>>(`/route/${params.charCode}`, params)
    .then(r => transformResponse<Message>(r)),
  deleteRoute: (charCode: string) => 
    api.delete<MessageReply<{ id: number }>>(`/route/${charCode}`)
    .then(r => transformResponse<MessageReply<{ id: number }>>(r)),
  uploadImage: (charCode: string, image: File) => {
    const fd = new FormData();
    fd.append('image', image, image.name);
    return api.post<MessageReply<{ path: string }>>(`/route/${charCode}/image`, fd)
      .then(r => transformResponse<MessageReply<{ path: string }>>(r))
  },
};
