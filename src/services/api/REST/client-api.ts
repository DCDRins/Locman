import api from '../agent';
import { AuthResponse, AuthParams, IUserDTO, IUser } from '../../../models';
import { responseLogger, transformResponse } from '../utils';
import { Message } from '../../../.types/types';

export const client = {
  auth: (payload: AuthParams) =>
    api.post<AuthResponse>('/auth', payload).then(r => transformResponse<AuthResponse>(r)),
  refresh: () =>
    api.post<AuthResponse>('/refresh').then(responseLogger),
  fetchUserData: () =>
    api.get<IUserDTO>('/user')
    .then(r => transformResponse<IUserDTO>(r)),
  editUserData: (user: IUser) =>
    api.put<Message>('/user', user)
    .then(r => transformResponse<Message>(r)),
  uploadUserImage: (image: File) => {
    const fd = new FormData();
    fd.append('photo', image, image.name); // or cuid()
    return api.post<Message>('/user/photo', fd)
      .then(r => transformResponse<Message>(r))
  },
};
