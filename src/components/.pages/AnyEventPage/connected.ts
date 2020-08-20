import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AnyEventPage, { DispatchedAnyEventPageProps, StoredAnyEventPageProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredAnyEventPageProps => ({
  event: event.current,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedAnyEventPageProps => bindActionCreators({
  fetchEvent: actions.eventActions.fetchEventAsync.request,
  createRoute: actions.routeActions.createRoute.request,
  openModal: actions.systemActions.openModal,
  closeModal: actions.systemActions.closeModal,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnyEventPage);

