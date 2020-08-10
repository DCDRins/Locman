import Types from 'MyTypes'
import { getValidData } from './subroutines/getValidData';
import { paginationComparison } from './subroutines/paginationComparison';
import { Pagination } from '../.types/types';
import { IEventDTO } from '../models';

const isTypeOf = <T>(x: any): x is T => true;

export const selectEvent = ({ event }: Types.RootState, charCode) => {
  const data: Array<IEventDTO> = [];
  Array.prototype.forEach.call(Object.entries(event), e => {
    const [key, value] = e;
    if (!value) return false;
    if (isTypeOf<Pagination<IEventDTO>>(value))
      data.concat(value.list)
    else if (isTypeOf<Array<IEventDTO>>(value))
      data.concat(value)
    else if (isTypeOf<IEventDTO>(value))
      data.push(value)
  })
  return [...data].find(
    e => e.characterCode === charCode
  )
}

export const selectClosestEvent = ({ event: { closest: { data } } }: Types.RootState) => data

export const selectManagedEventList = ({ event: { managedList: { data } } }: Types.RootState, params) => getValidData(data, params)
export const selectStockEventList = ({ event: { stockList: { data } } }: Types.RootState, params) => getValidData(data, params)

export const managedEventListComparison = ({ event: { managedList: { data } } }: Types.RootState, response) => paginationComparison(data, response)
export const stockEventListComparison = ({ event: { stockList: { data } } }: Types.RootState, response) => paginationComparison(data, response)