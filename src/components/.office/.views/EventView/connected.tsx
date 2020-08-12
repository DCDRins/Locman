import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import { EventView, DispatchedEventViewProps, StoredEventViewProps } from './view';

const mapStateToProps = ({ event, catalog }: Types.RootState): StoredEventViewProps => ({
  eventList: event.managedList,
  catalog: {
    event: catalog.event,
  },
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedEventViewProps => bindActionCreators({
  fetchUserEvents: actions.eventActions.fetchManagedEventListAsync.request,
  createEvent: actions.eventActions.createEventAsync.request,
  fetchEventFormatList: actions.catalogActions.fetchEventFormatList.request,
  fetchEventLevelList: actions.catalogActions.fetchEventLevelList.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventView);
