import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import { RouterView, DispatchedRouterViewProps, StoredRouterViewProps } from './view';

const mapStateToProps = ({ route }: Types.RootState): StoredRouterViewProps => ({
  acceptedRouteList: route.acceptedRouteList,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedRouterViewProps => bindActionCreators({
  fetchAcceptedRouteList: actions.routeActions.fetchAcceptedRouteList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouterView);
