
import { createAsyncAction } from 'typesafe-actions';
import { Tag, City, IOrganizationDTO, AcceptedOrganizationFilter, EducationProgram, EducationProgramSerialized } from '../models';
import { Pagination, HasSearchParams, HasNameParams, NamedType, Message, Nullable, HasPaginationParams, MessageReply, ErrorReply } from '../.types/types';


export const fetchTagListAsync = createAsyncAction(
  '@@catalog/tags/fetch/request',
  '@@catalog/tags/fetch/success',
  '@@catalog/tags/fetch/failure',
  '@@catalog/tags/fetch/cancel',
)<HasSearchParams, Pagination<Tag>, Error>();

export const fetchCitiesListAsync = createAsyncAction(
  '@@catalog/cities/fetch/request',
  '@@catalog/cities/fetch/success',
  '@@catalog/cities/fetch/failure',
  '@@catalog/cities/fetch/cancel',
)<HasNameParams, Array<City>, Error>();

export const fetchEventFormatList = createAsyncAction(
  '@@catalog/event/format/request',
  '@@catalog/event/format/success',
  '@@catalog/event/format/failure',
  '@@catalog/event/format/cancel',
)<{}, Array<NamedType>, Message>();
  
export const fetchEventLevelList = createAsyncAction(
  '@@catalog/event/level/request',
  '@@catalog/event/level/success',
  '@@catalog/event/level/failure',
  '@@catalog/event/level/cancel',
)<{}, Array<NamedType>, Message>();

export const fetchAcceptedOrganizationList = createAsyncAction(
  '@@catalog/organizationList/accepted/request',
  '@@catalog/organizationList/accepted/success',
  '@@catalog/organizationList/accepted/failure',
  '@@catalog/organizationList/accepted/cancel',
)<AcceptedOrganizationFilter, Nullable<Array<IOrganizationDTO>>, Message>();

export const fetchRestOrganizationList = createAsyncAction(
  '@@catalog/organizationList/rest/request',
  '@@catalog/organizationList/rest/success',
  '@@catalog/organizationList/rest/failure',
  '@@catalog/organizationList/rest/cancel',
)<string, Nullable<Array<IOrganizationDTO>>, Message>();

export const fetchOrganizationTypes = createAsyncAction(
  '@@catalog/organization/types/request',
  '@@catalog/organization/types/success',
  '@@catalog/organization/types/failure',
  '@@catalog/organization/types/cancel',
)<{}, Array<NamedType>, Message>();

export const fetchOrganizationCategories = createAsyncAction(
  '@@catalog/organization/categories/request',
  '@@catalog/organization/categories/success',
  '@@catalog/organization/categories/failure',
  '@@catalog/organization/categories/cancel',
)<HasPaginationParams, Pagination<NamedType>, Message>();

export const fetchUserEduProgramList = createAsyncAction(
  '@@catalog/program/user/request',
  '@@catalog/program/user/success',
  '@@catalog/program/user/failure',
  '@@catalog/program/user/cancel',
)<HasPaginationParams, Nullable<Pagination<EducationProgram>>, ErrorReply>();

export const createEduProgram = createAsyncAction(
  '@@catalog/program/create/request',
  '@@catalog/program/create/success',
  '@@catalog/program/create/failure',
  '@@catalog/program/create/cancel',
)<EducationProgramSerialized, MessageReply<EducationProgram>, ErrorReply>();

export const fetchSubjectList = createAsyncAction(
  '@@catalog/subjects/request',
  '@@catalog/subjects/success',
  '@@catalog/subjects/failure',
  '@@catalog/subjects/cancel',
)<HasPaginationParams & { name?: string }, Pagination<NamedType>, Message>();
