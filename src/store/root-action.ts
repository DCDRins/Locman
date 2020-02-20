import { routerActions } from 'connected-react-router';
import * as actions from '../actions';

export default {
  router: routerActions,
  client: actions.clientActions,
  user: actions.userActions,
  routes: actions.routeActions,
};
