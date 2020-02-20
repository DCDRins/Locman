import Types from 'MyTypes'
import { select, SelectEffect } from 'redux-saga/effects'

export function selectState<T>(selector: (s: Types.RootState, params: any) => T, params: any): SelectEffect {
  return select(selector, params);
}