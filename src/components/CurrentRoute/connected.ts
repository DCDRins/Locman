import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CurrentRoute, { DispatchedCurrentRouteProps, StoredCurrentRouteProps } from './view';

const mapStateToProps = ({ route }: Types.RootState): StoredCurrentRouteProps => ({
  currentRoute: route.current,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedCurrentRouteProps => bindActionCreators({
  fetchCurrentRoute: actions.routeActions.fetchCurrentRoute.request,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentRoute);

