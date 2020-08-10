import Types from 'MyTypes'
import { getValidData } from './subroutines/getValidData';
import { paginationComparison } from './subroutines/paginationComparison';

export const selectOrganizationList = ({ organization: { list: { data } } }: Types.RootState, params) => getValidData(data, params)

export const organizationListComparison = ({ organization: { list: { data } } }: Types.RootState, response) => paginationComparison(data, response)
