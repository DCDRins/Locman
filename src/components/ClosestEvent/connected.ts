import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ClosestEvent, { DispatchedClosestEventProps, StoredClosestEventProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredClosestEventProps => ({
  event: event.closest,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedClosestEventProps => bindActionCreators({
  fetchClosestEvent: actions.eventActions.fetchClosestEvent.request,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClosestEvent);

