import { routerActions } from 'connected-react-router';
import * as actions from '../actions';

export default {
  router: routerActions,
  client: actions.clientActions,
  routes: actions.routeActions,
};
