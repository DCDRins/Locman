import { HasPaginationParams, Pagination, Nullable } from '../../.types/types';
import { onPageItemsCount } from '../../common/constants';
/**
 * 
 * @param data 
 * @param params
 * @param count 
 * functions for pagination data
 */

export const getValidData = (data: Nullable<Pagination<any>>, { page = 1 }: HasPaginationParams, count: number = onPageItemsCount): Nullable<Pagination<any>> => {
  count <= 0 && (
    count = 1
  );

  if (!data) return null;
  const { currentPage } = data

  return currentPage && page <= currentPage
    ? { ...data, list: [] }
    : null;
    // data.list.length < count
    //   ? null
    //   : data;
}
