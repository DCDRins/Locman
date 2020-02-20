import api from '../agent';
import { IUserDTO } from '../../../models';
import { ServerResponse } from '../types';
import { responseLogger } from '../utils';

export const user = {
  receiveData: () =>
    api.get<IUserDTO>('/user', {
      transformResponse: (r: ServerResponse<IUserDTO>) => r && r.data
    }).then(responseLogger),
};
