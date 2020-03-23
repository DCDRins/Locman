import Types from 'MyTypes'
import { select, SelectEffect } from 'redux-saga/effects'

export function selectState<T, R extends any>(selector: (s: Types.RootState, params?: R) => T, params?: R): SelectEffect {
  return select(selector, params);
}