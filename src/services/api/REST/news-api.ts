import api from '../agent';
import { ISliderNewsDTO, INewsDTO } from '../../../models';
import { transformResponse, responseLogger } from '../utils';
import { Pagination, IFetchParams } from '../../../.types/types';

export const news = {
  fetchSliderNews: () => 
    api.get<ISliderNewsDTO[]>(`/news/main`)
    .then(r => transformResponse<ISliderNewsDTO[]>(r)),
  fetchNewsList: (params: IFetchParams) => 
    api.get<Pagination<INewsDTO>>(`/news`, {
      params,
    }).then(r => transformResponse<Pagination<INewsDTO>>(r)),
};
