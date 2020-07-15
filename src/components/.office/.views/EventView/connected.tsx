import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import { EventView, DispatchedEventViewProps, StoredEventViewProps } from './view';

const mapStateToProps = ({ event, catalog }: Types.RootState): StoredEventViewProps => ({
  eventList: event.managedList,
  catalog: {
    tags: catalog.tags,
    event: catalog.event,
  }
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedEventViewProps => bindActionCreators({
  fetchUserEvents: actions.eventActions.fetchManagedEventListAsync.request,
  editEvent: actions.eventActions.editEventAsync.request,
  createEvent: actions.eventActions.createEventAsync.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
  uploadImage: actions.eventActions.uploadImageAsync.request,
  uploadImageRange: actions.eventActions.uploadImageRangeAsync.request,
  deleteImageFromRange: actions.eventActions.deleteImageFromRangeAsync.request,
  fetchTagList: actions.catalogActions.fetchTagListAsync.request,
  fetchEventFormatList: actions.catalogActions.fetchEventFormatList.request,
  fetchEventLevelList: actions.catalogActions.fetchEventLevelList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventView);
