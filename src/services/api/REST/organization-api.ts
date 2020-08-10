import api from '../agent';
import { IOrganizationDTO, IOrganization, IUserDTO, OrganizationFilters } from '../../../models';
import { transformResponse, responseLogger } from '../utils';
import { Message, HasCodeParams, Nullable, MessageReply, HasPaginationParams, Pagination, IFetchParamsExtended } from '../../../.types/types';

export const organization = {
  fetch: (id: number) =>
    api.get<Nullable<IOrganizationDTO>>(`/organization/${id}`)
    .then(r => transformResponse<Nullable<IOrganizationDTO>>(r)),
  fetchOrganizationByInn: (inn: string) => 
    api.get<MessageReply<IOrganizationDTO>>('/reg/inn', {
      params: {
        inn,
      },
  }).then(r => transformResponse<MessageReply<IOrganizationDTO>>(r)),
  registerNewOrganization: (data: IOrganization) => 
    api.post<Message>('/reg/organization', data).then(r => transformResponse<Message>(r)),
  edit: (data: IOrganization) =>
    api.put<Message>(`/organization/${data.characterCode}`, data)
    .then(r => transformResponse<Message>(r)),
  uploadImage: ({ code: charCode, data: image }: HasCodeParams<File>) => {
    const fd = new FormData();
    fd.append('image', image, image.name);
    return api.post<Message>(`/organization/${charCode}/image`, fd)
      .then(r => transformResponse<Message>(r))
  },
  fetchOrganizationUserList: (params: HasPaginationParams) => 
    api.get<Pagination<IUserDTO>>('/organization_users', {
      params,
    }).then(r => transformResponse<Pagination<IUserDTO>>(r)),
  fetchOrganizationList: (params: IFetchParamsExtended<OrganizationFilters>) => 
    api.get<Nullable<Pagination<IOrganizationDTO>>>('/organization', {
      params,
    }).then(r => transformResponse<Nullable<Pagination<IOrganizationDTO>>>(r)),
};
