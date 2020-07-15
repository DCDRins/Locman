import api from '../agent';
import { IEventDTO, IEvent, Tag, ClosestEvent } from '../../../models';
import { responseLogger, transformResponse } from '../utils';
import { IFetchParams, Pagination, MessageReply, Message, Nullable } from '../../../.types/types';

export const event = {
  fetchEventByCharCode: (charCode: string | number) => // characterCode or ID
    api.get<IEventDTO>(`/event/${charCode}`)
    .then(r => transformResponse<IEventDTO>(r)),
  fetchEventList: (params: IFetchParams) =>
    api.get<Nullable<Pagination<IEventDTO>>>(`/event`, {
      params,
    }).then(r => transformResponse<Nullable<Pagination<IEventDTO>>>(r)),
  fetchManagedEventList: (params: IFetchParams) =>
    api.get<Nullable<Pagination<IEventDTO>>>(`/user/event`, {
      params,
    }).then(r => transformResponse<Nullable<Pagination<IEventDTO>>>(r)),
  createEvent: (params: IEvent) =>
    api.post<MessageReply<IEventDTO>>(`/event`, params)
    .then(r => transformResponse<MessageReply<IEventDTO>>(r).data),
  editEvent: (params: IEvent) =>
    api.put<MessageReply<IEventDTO>>(`/event/${params.charCode}`, params)
    .then(r => transformResponse<Message>(r)),
  deleteEvent: (charCode: string) => 
    api.delete<MessageReply<{ id: number }>>(`/event/${charCode}`)
    .then(r => transformResponse<MessageReply<{ id: number }>>(r)),
  uploadImage: (charCode: string, image: File) => {
    const fd = new FormData();
    fd.append('image', image, image.name);
    return api.post<MessageReply<{ path: string }>>(`/event/${charCode}/image`, fd)
      .then(r => transformResponse<MessageReply<{ path: string }>>(r))
  },
  uploadImageRange: (charCode: string, images: FileList) => {
    const fd = new FormData();
    Array.prototype.forEach.call(images, image => fd.append('images[]', image, image.name))
    return api.post<MessageReply<{ path: string }>>(`/event/${charCode}/images`, fd)
      .then(r => transformResponse<MessageReply<{ path: string }>>(r))
  },
  deleteImageFromRange: (charCode: string, id: number) => {
    return api.delete<MessageReply<{ event: number, image: number }>>(`/event/${charCode}/images`, {
      params: {
        images: id
      }
    }).then(r => transformResponse<MessageReply<{ event: number, image: number }>>(r))
  },
  fetchClosestEvent: () =>
    api.get<ClosestEvent>(`/user/event/nearest`).then(r => transformResponse<ClosestEvent>(r)),
};
