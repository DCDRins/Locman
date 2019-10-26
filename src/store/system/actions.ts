import { SystemActionTypes, UPDATE_SESSION, SystemState } from './types'

export function updateSession(newSession: SystemState, timestamp: number): SystemActionTypes {
  return {
    type: UPDATE_SESSION,
    payload: newSession,
    meta: {
      timestamp,
    }
  }
}
