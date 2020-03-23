import api from '../agent';
import { IArticleDTO, ICategoryDTO, IArticle } from '../../../models';
import { responseLogger } from '../utils';
import { IFetchParams, Pagination, MessageReply } from '../../../.types/types';
// import { ServerResponse } from '../types';
// import transformRequest from './subroutines/transformRequest';

export const knowledge = {
  fetchArticleByCharCode: (charCode: string | number) =>
    api.get<IArticleDTO>(`/base/${charCode}`, {
      // transformResponse: (r: ServerResponse<IArticleDTO>) => r && r.data
    }).then(responseLogger),
  fetchArticleList: (params: IFetchParams) =>
    api.get<Pagination<IArticleDTO>>('/base', {
      data: params,
    }).then(responseLogger),
  fetchCategoriesList: (params: IFetchParams) =>
    api.get<Pagination<ICategoryDTO>>('/catalog/base/category', {
      data: params,
    }).then(responseLogger),
  createArticle: (params: IArticle) =>
    api.post<MessageReply<IArticleDTO>>('/base', params)
    .then(responseLogger),
  createCategory: (params: ICategoryDTO) =>
    api.post<MessageReply<ICategoryDTO>>('/catalog/base/category', params)
    .then(responseLogger),
  editArticle: (params: IArticle) => 
    api.put<MessageReply<IArticleDTO>>(`/base/${params.characterCode}`, params
    ).then(responseLogger),
  deleteCategory: (params: Array<number> | string) =>
    api.delete<string>('/catalog/base/category', {
      data: params,
      // transformResponse: (r: ServerResponse<string>) => r && r.data
    }).then(responseLogger),
  deleteArticle: (charCode: string) =>
    api.delete<string>(`/base/${charCode}`, {
      // transformResponse: (r: ServerResponse<string>) => r && r.data
    }).then(responseLogger),
};
