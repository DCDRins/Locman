import { HasPaginationParams, Pagination, Nullable } from '../../.types/types';
import { onPageItemsCount } from '../../common/constants';
/**
 * 
 * @param data 
 * @param params
 * @param count 
 * functions for pagination data
 */

export const paginationComparison = (data: Nullable<Pagination<any>>, response: Nullable<Pagination<any>>): Nullable<Pagination<any>> => {

  if (!data) return response;
  if (!response) return null;
  
  return {
    ...response,
    list: response.list.filter(item => data.list.indexOf(item) !== -1),
  };
}
