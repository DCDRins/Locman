export as namespace modelTypes;

export interface Dictionary<T> {
  [id: string]: T;
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
export interface ErrorReply {
  errors?: any; // maybe fix this
}
export interface MessageReply<T> extends Message {
  data: T;
  errors?: ErrorReply;
}
export interface Message {
  message?: string;
}
export interface Pagination<T> {
  list: T[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}
export interface IFetchParams extends HasCategoryParams, HasPaginationParams, HasSearchParams { }