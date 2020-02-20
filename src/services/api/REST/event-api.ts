import api from '../agent';
import { MessageReply, IEventDTO, IEvent, IFetchParams, Pagination, Message } from '../../../models';
import { responseLogger } from '../utils';
import { ServerResponse } from '../types';

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
    }).then(responseLogger),
  createEvent: (params: IEvent) =>
    api.post<MessageReply<IEventDTO>>(`/event`, params)
    .then(responseLogger),
  editEvent: (params: IEvent) =>
    api.put<Message>(`/event/${params.charCode}`, params)
    .then(responseLogger),
  deleteEvent: (charCode: string) =>
    api.delete<Message>(`/event/${charCode}`)
    .then(responseLogger),
};
