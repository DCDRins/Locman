import Types from 'MyTypes'
// import getActualData from './subroutines/getActualData';
import { onPageItemsCount } from '../common/constants';
import { IFetchParams, Nullable, Pagination } from '../.types/types';
import { getValidData } from './subroutines/getValidData';
import { INewsDTO } from '../models';
import { paginationComparison } from './subroutines/paginationComparison';

export const selectSliderNews = ({ news: { slider: { data } } }: Types.RootState) => data && data.length > 0 ? data : null
export const selectNewsList = ({ news: { newsList: { data } } }: Types.RootState, params: IFetchParams) => getValidData(data, params)

export const newsListComparison = ({ news: { newsList: { data } } }: Types.RootState, response: Nullable<Pagination<INewsDTO>>) => paginationComparison(data, response)
