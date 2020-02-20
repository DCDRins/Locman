
export const loggerMiddleware = store => next => action => {
  // console.groupCollapsed(action.type)
  const colorType = action.type.includes('success') ? 'lightgreen'
  : action.type.includes('failure') ? 'red; color: white;'
  : action.type.includes('cancel') ? 'lightblue'
  : action.type.includes('request') ? 'lightgrey'
  : 'white';
  console.groupCollapsed(`%c${action.type}`, `background: ${colorType}`)
  console.info('payload', action.payload);
  console.info('next state', store.getState())
  console.groupEnd()
  let result = next(action)
  return result
}
