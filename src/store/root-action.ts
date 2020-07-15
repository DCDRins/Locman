import { routerActions } from 'connected-react-router';
import * as actions from '../actions';

export default {
  router: routerActions,
  client: actions.clientActions,
  route: actions.routeActions,
  system: actions.systemActions,
  knowledge: actions.knowledgeActions,
  event: actions.eventActions,
  catalog: actions.catalogActions,
  organization: actions.organizationActions,
  news: actions.newsActions,
};
