export const UPDATE_SESSION = 'UPDATE_SESSION'

export interface SystemState {
  timestamp: number,
  name: string,
}

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION,
  payload: SystemState,
  meta: {
    timestamp: number
  }
}

export type SystemActionTypes = UpdateSessionAction