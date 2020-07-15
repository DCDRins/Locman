import { createAsyncAction, createCustomAction } from 'typesafe-actions';
import { AuthResponse, AuthParams, IUserDTO, IUser, IRegistrationModel } from '../models';
import { Message, ImageType, ErrorReply, HasPaginationParams, Pagination } from '../.types/types';

export const authAsync = createAsyncAction(
  '@@auth/request - Send login and password to receive user data',
  '@@auth/success - Async service returned user data',
  '@@auth/failure - Something in user authorization went wrong',
  '@@auth/cancel - Cancelling on going auth request',
)<AuthParams, AuthResponse, Message>();

export const register = createAsyncAction(
  '@@register/request',
  '@@register/success',
  '@@register/failure',
  '@@register/cancel',
)<IRegistrationModel, Message, Message>();

export const confirm = createAsyncAction(
  '@@register/confirm/request',
  '@@register/confirm/success',
  '@@register/confirm/failure',
  '@@register/confirm/cancel',
)<string, any, ErrorReply>(); // success doesnt matter

export const refreshAsync = createAsyncAction(
  '@@refhresh/request - Ask service to refresh my token',
  '@@refresh/success - Async service returned refreshed token',
  '@@refresh/failure - Something went wrong while token was refreshing',
)<{}, AuthResponse, Error>();

export const logout = createCustomAction('@@user/logout');

export const fetchUserData = createAsyncAction(
  '@@user/request - Fetching user data async',
  '@@user/success - Async service returned user data',
  '@@user/failure - Something went wrong',
  '@@user/cancel - Cancelling ongoing fetch request',
)<{}, IUserDTO, Message>();

export const editUserData = createAsyncAction(
  '@@user/edit/request - Edit user data async',
  '@@user/edit/success - Successfully edited',
  '@@user/edit/failure - Something went wrong',
  '@@user/edit/cancel - Cancelling ongoing edit request',
)<IUser, Message, Message>();

export const uploadUserImage = createAsyncAction(
  '@@user/image/request - Upload user image async',
  '@@user/image/success - Successfully uploaded',
  '@@user/image/failure - Something went wrong',
  '@@user/image/cancel - Cancelling ongoing upload request',
)<File, ImageType, Message>();
