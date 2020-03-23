

export type Nullable<T> = T | null
export interface Dictionary<T> {
  [id: string]: T;
}
export interface HasStringParams<T> {
  data: T;
  code: string | number;
}
export interface HasSearchParams {
  search?: string;
}
export interface HasCategoryParams {
  category?: Array<number>;
}
export interface HasPaginationParams {
  page: number;
  onPage?: number;
}
export interface HasTypeParams {
  type?: 'tree' | string;
}
export interface NamedType {
  id: number;
  name: string;
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
export interface ImageReply {
  path: string;
}
export interface IFetchParams extends HasCategoryParams, HasPaginationParams, HasSearchParams { }
