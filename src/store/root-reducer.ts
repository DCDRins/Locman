import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState as ConnecterRouterState } from 'connected-react-router';
import { History } from 'history';
import clientReducer, { ClientState } from '../reducers/client-reducer';
import routeReducer, { RouteState } from '../reducers/route-reducer';
import knowledgeReducer, { KnowledgeState } from '../reducers/knowledge-reducer';

export interface ApplicationState {
  router: ConnecterRouterState;
  client: ClientState;
  route: RouteState;
  knowledge: KnowledgeState;
}

export default (history: History): Reducer<ApplicationState> => combineReducers({
  router: connectRouter(history),
  client: clientReducer,
  route: routeReducer,
  knowledge: knowledgeReducer,
});
