import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { EventView, DispatchedUserViewProps, StoredUserViewProps } from '..';

const mapStateToProps = ({ event }: Types.RootState): StoredUserViewProps => ({
  data: event.data,
  isLoading: event.isLoading,
  error: event.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedUserViewProps => bindActionCreators({
  fetchUserEvents: actions.eventActions.fetchUserEventListAsync.request,
  createEvent: actions.eventActions.createEventAsync.request,
  editEvent: actions.eventActions.editEventAsync.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
}, dispatch);


export const UserViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView);

