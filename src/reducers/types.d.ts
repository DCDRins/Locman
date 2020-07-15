import { ErrorReply } from "../.types/types";

export as namespace ReducerDefaults;

export interface ReducerBaseState<T> {
  data: T;
  isLoading: boolean;
  error: Nullable<ErrorReply>;
}

export interface HasLifeTime {
  actualDate?: Moment;
  lifeTime: number;
}
