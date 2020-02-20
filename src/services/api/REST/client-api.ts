import api from '../agent';
import { AuthResponse, AuthParams } from '../../../models';
import { responseLogger } from '../utils';

export const client = {
  auth: (payload: AuthParams) =>
    api.post<AuthResponse>('/auth', payload).then((e) => {
      responseLogger(e);
      if (e.data.accessToken)
        localStorage.setItem('token', e.data.accessToken);
    }),
  refresh: () =>
    api.post<AuthResponse>('/refresh').then(responseLogger),
};
