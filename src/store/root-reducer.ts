import { combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState as ConnecterRouterState } from 'connected-react-router';
import { History } from 'history';
import clientReducer, { ClientState } from '../reducers/client-reducer';
import routeReducer, { RouteState } from '../reducers/route-reducer';
import knowledgeReducer, { KnowledgeState } from '../reducers/knowledge-reducer';
import eventReducer, { EventState } from '../reducers/event-reducer';
import systemReducer, { SystemState } from '../reducers/system-reducer';
import organizationReducer, { OrganizationState } from '../reducers/organization-reducer';
import catalogReducer, { CatalogState } from '../reducers/catalog-reducer';
import newsReducer, { NewsState } from '../reducers/news-reducer';

export interface ApplicationState {
  router: ConnecterRouterState;
  system: SystemState;
  client: ClientState;
  route: RouteState;
  knowledge: KnowledgeState;
  event: EventState;
  organization: OrganizationState;
  catalog: CatalogState;
  news: NewsState;
}

export default (history: History): Reducer<ApplicationState> => combineReducers({
  router: connectRouter(history),
  system: systemReducer,
  client: clientReducer,
  route: routeReducer,
  knowledge: knowledgeReducer,
  event: eventReducer,
  organization: organizationReducer,
  catalog: catalogReducer,
  news: newsReducer,
});
