import Types from 'MyTypes'
import getActualData from './subroutines/getActualData';
import { paginationComparison } from './subroutines/paginationComparison';
import { getValidData } from './subroutines/getValidData';

export const getRoutes = ({ route: { acceptedRouteList: list }}: Types.RootState) => list.data;

export const getCurrentRoute = ({ route: { current: { data, lifeTime, actualDate } }}: Types.RootState) => getActualData(data, actualDate, lifeTime);


export const selectUserRouteList = ({ route: { userRouteList: { data } } }: Types.RootState, params) => getValidData(data, params)

export const userRouteListComparison = ({ route: { userRouteList: { data } } }: Types.RootState, response) => paginationComparison(data, response)