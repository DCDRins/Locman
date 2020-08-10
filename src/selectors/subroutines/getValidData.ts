import { HasPaginationParams, Pagination, Nullable, NeedRestore } from '../../.types/types';
import { previewItemsCount } from '../../common/constants';
/**
 * 
 * @param data 
 * @param params
 * @param count 
 * functions for pagination data
 */

export const getValidData = (data: Nullable<Pagination<any>>, { page = 1, resetStore = false }: HasPaginationParams & NeedRestore): Nullable<Pagination<any>> => {

  if (!data || resetStore) return null;
  const { currentPage } = data

  return currentPage && page <= currentPage && page !== -1
    ? { ...data, list: [] }
    : null;
}
