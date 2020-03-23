import api from '../agent';
import { IEventDTO, IEvent, Tag } from '../../../models';
import { responseLogger, transformResponse } from '../utils';
import { ServerResponse } from '../types';
import { IFetchParams, Pagination, MessageReply, Message, HasSearchParams } from '../../../.types/types';

export const event = {
  fetchEventByCharCode: (charCode: string | number) => // characterCode or ID
    api.get<IEventDTO>(`/event/${charCode}`, {
      transformResponse: (r: ServerResponse<IEventDTO>) => r && r.data
    }).then(responseLogger),
  fetchEventList: (params: IFetchParams) =>
    api.get<Pagination<IEventDTO>>(`/event`, {
      data: params,
    }).then(responseLogger),
  fetchUserEventList: (params: IFetchParams) =>
    api.get<Pagination<IEventDTO>>(`/user/event`, {
      data: params,
    }).then(r => transformResponse<Pagination<IEventDTO>>(r)),
  createEvent: (params: IEvent) =>
    api.post<MessageReply<IEventDTO>>(`/event`, params)
    .then(r => transformResponse<MessageReply<IEventDTO>>(r).data),
  editEvent: (params: IEvent) =>
    api.put<MessageReply<IEventDTO>>(`/event/${params.charCode}`, params)
    .then(r => transformResponse<Message>(r)),
  deleteEvent: (charCode: string) => 
    api.delete<Message>(`/event/${charCode}`)
    .then(responseLogger),
  fetchTagList: (params: HasSearchParams) => 
    api.get<Pagination<Tag>>(`/tag`, {
      data: params
    }).then(r => transformResponse<Pagination<Tag>>(r)),
  uploadImage: (charCode: string, image: File) => {
    const fd = new FormData();
    fd.append('image', image, image.name);
    return api.post<Message>(`/event/${charCode}/image`, fd)
      .then(r => transformResponse<Message>(r))
  },
};
