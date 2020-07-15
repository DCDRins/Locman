import Types from 'MyTypes'
import getActualData from './subroutines/getActualData';
import { getValidData } from './subroutines/getValidData';
import { paginationComparison } from './subroutines/paginationComparison';

// const checkLifeTime = 

export const selectTags = ({ catalog: { tags: { data } } }: Types.RootState) => data && data.list.length > 0 ? data : null
export const selectCities = ({ catalog: { cities: { data, actualDate, lifeTime } } }: Types.RootState) => getActualData(data, actualDate, lifeTime)

export const selectEventFormatList = ({ catalog: { event: { formatList } } }: Types.RootState) => formatList.data.length > 0 ? formatList.data : null
export const selectEventLevelList = ({ catalog: { event: { levelList } } }: Types.RootState) => levelList.data.length > 0 ? levelList.data : null

export const selectProgramList = ({ catalog: { userEduProgramList: { data } } }: Types.RootState, params) => getValidData(data, params);
export const programListComparison = ({ catalog: { userEduProgramList: { data } } }: Types.RootState, response) => paginationComparison(data, response);
