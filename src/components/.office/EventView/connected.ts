import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { EventView, DispatchedUserViewProps, StoredUserViewProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredUserViewProps => ({
  data: event.events.data,
  isLoading: event.events.isLoading,
  error: event.events.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedUserViewProps => bindActionCreators({
  fetchUserEvents: actions.eventActions.fetchUserEventListAsync.request,
  createEvent: actions.eventActions.createEventAsync.request,
  editEvent: actions.eventActions.editEventAsync.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
  fetchTagList: actions.eventActions.fetchTagListAsync.request,
}, dispatch);


export const EventViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView);

