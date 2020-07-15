import moment from "moment"

export const makeDefault = state => ({
  ...state,
  isLoading: true,
  error: null,
})
export const store = (state, payload) => ({
  ...state,
  data: payload,
  isLoading: false,
})
export const storePlus = (state, payload) => ({
  ...state,
  data: state.data ? [...state.data, payload] : payload,
  isLoading: false,
})
export const storeList = (state, payload) => ({
  ...state,
  isLoading: false,
  data: payload && {
    ...payload,
    list: state.data
      ? [...state.data.list, ...payload.list]
      : payload.list,
  },
})
export const restore = (state, payload) => ({
  ...state,
  data: payload,
  actualDate: moment(),
  isLoading: false,
})
export const errorHandling = (state, payload) => ({
  ...state,
  error: payload,
  isLoading: false,
})