
export as namespace ReducerDefaults;

export interface ReducerDefaultState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}