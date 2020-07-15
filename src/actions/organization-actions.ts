import { createAsyncAction } from 'typesafe-actions';
import { IOrganizationDTO, IOrganization, IUserDTO } from '../models';
import { Message, HasCodeParams, Nullable, ErrorReply, MessageReply, ImageType, HasPaginationParams, Pagination } from '../.types/types';

export const fetchOrganizationData = createAsyncAction(
  '@@organization/fetch/request',
  '@@organization/fetch/success',
  '@@organization/fetch/failure',
  '@@organization/fetch/cancel',
)<{}, Nullable<IOrganizationDTO>, Message>();

export const editOrganizationData = createAsyncAction(
  '@@organization/edit/request',
  '@@organization/edit/success',
  '@@organization/edit/failure',
  '@@organization/edit/cancel',
)<IOrganization, Message, Message>();

export const uploadOrganizationImage = createAsyncAction(
  '@@organization/upload image/request',
  '@@organization/upload image/success',
  '@@organization/upload image/failure',
  '@@organization/upload image/cancel',
)<HasCodeParams<File>, MessageReply<ImageType>, Message>();

export const fetchOrganizationByInn = createAsyncAction(
  '@@organization/organization/inn/request',
  '@@organization/organization/inn/success',
  '@@organization/organization/inn/failure',
  '@@organization/organization/inn/cancel',
)<{ inn: string }, MessageReply<Nullable<IOrganizationDTO>>, Message>();

export const registerNewOrganization = createAsyncAction(
  '@@organization/organization/reg/request',
  '@@organization/organization/reg/success',
  '@@organization/organization/reg/failure',
  '@@organization/organization/reg/cancel',
)<IOrganization, Message, Message>();

export const fetchOrganizationUserList = createAsyncAction(
  '@@organization/users/request',
  '@@organization/users/success',
  '@@organization/users/failure',
  '@@organization/users/cancel',
)<HasPaginationParams, Pagination<IUserDTO>, Message>();
