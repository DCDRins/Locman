import Types from 'MyTypes'
import getActualData from './subroutines/getActualData';

export const getRoutes = ({ route: { acceptedRouteList: list }}: Types.RootState) => list.data;

export const getCurrentRoute = ({ route: { current: { data, lifeTime, actualDate } }}: Types.RootState) => getActualData(data, actualDate, lifeTime);
