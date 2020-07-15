import api from '../agent';
import { Tag, City, IOrganizationDTO, AcceptedOrganizationFilter, EducationProgram } from '../../../models';
import { responseLogger, transformResponse } from '../utils';
import { Pagination, HasSearchParams, HasNameParams, NamedType, Nullable, HasPaginationParams, MessageReply } from '../../../.types/types';

export const catalog = {
  fetchTagList: (params: HasSearchParams) => 
    api.get<Pagination<Tag>>(`/tag`, {
      data: params
    }).then(r => transformResponse<Pagination<Tag>>(r)),
  fetchCitiesList: (params: HasNameParams) => 
    api.get<Array<City>>('/catalog/cities', {
      data: { name: params.name },
    }).then(r => transformResponse<Array<City>>(r)),
  fetchEventFormatList: () =>
    api.get<Array<NamedType>>('/catalog/event/format')
    .then(r => transformResponse<Array<NamedType>>(r)),
  fetchEventLevelList: () => 
    api.get<Array<NamedType>>('/catalog/event/level')
    .then(r => transformResponse<Array<NamedType>>(r)),
  fetchAcceptedOrganizationList: (params: AcceptedOrganizationFilter) => 
    api.get<Nullable<Array<IOrganizationDTO>>>('/catalog/org', {
      params,
    }).then(r => transformResponse<Nullable<Array<IOrganizationDTO>>>(r)),
  fetchOrganizationTypes: () =>
    api.get<Array<NamedType>>('/catalog/org_types')
      .then(r => transformResponse<Array<NamedType>>(r)),
  fetchOrganizationCategories: (params: HasPaginationParams) =>
    api.get<Pagination<NamedType>>('/catalog/organization-category', {
      params,
    }).then(r => transformResponse<Pagination<NamedType>>(r)),
  fetchUserEduProrgamList: (params: HasPaginationParams) =>
    api.get<Pagination<EducationProgram>>('/user/education_program', {
      params,
    }).then(r => transformResponse<Pagination<EducationProgram>>(r)),
  createEduProrgam: (program: EducationProgram) =>
    api.post<MessageReply<EducationProgram>>('/education_program', program)
    .then(r => transformResponse<MessageReply<EducationProgram>>(r)),
  fetchSubjectList: (params: HasPaginationParams & { name?: string }) =>
    api.get<Pagination<NamedType>>('/catalog/subjects', {
      params,
    }).then(r => transformResponse<Pagination<NamedType>>(r)),
};
