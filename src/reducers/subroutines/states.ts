import { ReducerBaseState } from "../types"
import { Pagination } from "../../.types/types"

export const initialNullableState: ReducerBaseState<any> = Object.freeze({
  data: null,
  isLoading: true,
  error: null,
})
export const initialArrayState: ReducerBaseState<Array<any>> = Object.freeze({
  data: [],
  isLoading: true,
  error: null,
})
export const initialPaginationState: ReducerBaseState<Pagination<any>> = Object.freeze({
  data: {
    list: [],
    currentPage: 1,
  },
  isLoading: true,
  error: null,
})