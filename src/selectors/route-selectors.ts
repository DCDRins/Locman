
import { RouteState } from '../reducers/route-reducer';

export const getRoutes = (state: RouteState) => state.routes.data;
export const getRoutesLoadingState = (state: RouteState) => state.routes.isLoading;

// export const getFilteredTodos = createSelector(getTodos, getTodosFilter, (todos, todosFilter) => {
//   switch (todosFilter) {
//     case 'completed':
//       return todos.filter(t => t.completed);
//     case 'active':
//       return todos.filter(t => !t.completed);

//     default:
//       return todos;
//   }
// });
