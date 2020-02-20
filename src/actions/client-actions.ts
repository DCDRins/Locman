import { createAsyncAction } from 'typesafe-actions';
import { AuthResponse, AuthParams } from '../models';

export const authAsync = createAsyncAction(
  '@@auth/request - Send login and password to receive user data',
  '@@auth/success - Async service returned user data',
  '@@auth/failure - Something in user authorization went wrong',
  '@@auth/cancel - Cancelling on going auth request',
)<AuthParams, AuthResponse, Error>();

export const refreshAsync = createAsyncAction(
  '@@refhresh/request - Ask service to refresh my token',
  '@@refresh/success - Async service returned refreshed token',
  '@@refresh/failure - Something went wrong while token was refreshing',
)<{}, AuthResponse, Error>();
