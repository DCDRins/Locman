import { HasPaginationParams, Pagination, Nullable } from '../../.types/types';
import { previewItemsCount } from '../../common/constants';
/**
 * 
 * @param data 
 * @param params
 * @param count 
 * functions for pagination data
 */

export const paginationComparison = (data: Nullable<Pagination<any & { id: number }>>, response: Nullable<Pagination<any & { id: number }>>): Nullable<Pagination<any>> => {

  if (!data) return response;
  if (!response) return null;
  return {
    ...response,
    list: response.list.filter(({ id }) => data.list.find(({ id: _id }) => _id === id ) === undefined),
  };
}
