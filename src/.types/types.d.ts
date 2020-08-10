

export type Modify<T, R> = Omit<T, keyof R> & R;
export type Nullable<T> = T | null | undefined
export interface Dictionary<T> {
  [id: string]: T;
}
export interface HasCodeParams<T> {
  data: T;
  code: string | number;
}
export interface HasNameParams {
  name?: string;
}
export interface HasSearchParams {
  search?: string;
}
// export interface HasFilterParams<T> {
//   filters?: Array<T>;
// }
export interface HasCategoryParams {
  category?: Array<number>;
}
// export interface HasSortParams<T> {
//   sort?: Array<T>;
// }
export interface HasPaginationParams {
  page?: number;
  onPage?: number;
}
export interface HasTypeParams {
  type?: 'tree' | string;
}
export interface NeedRestore {
  resetStore?: boolean;
}
export interface NamedType {
  id: number;
  name: string;
}
export interface ImageType {
  id: number;
  path: string;
}
export interface Errors {
  errors?: any;
}
export interface Message {
  message?: string;
}
export interface ErrorReply extends Message, Errors { }
export interface MessageReply<T> extends ErrorReply {
  data: T;
}
export interface Pagination<T> {
  list: T[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}
export interface IFetchParams extends HasCategoryParams, HasPaginationParams, HasSearchParams { }

export type IFetchParamsExtended<T extends any> = T & HasPaginationParams & HasSearchParams & NeedRestore
