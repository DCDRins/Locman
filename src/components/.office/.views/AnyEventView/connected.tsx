import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import { AnyEventView, DispatchedAnyEventViewProps, StoredAnyEventViewProps } from './view';

const mapStateToProps = ({ event, catalog }: Types.RootState): StoredAnyEventViewProps => ({
  catalog: {
    tags: catalog.tags,
    event: catalog.event,
  },
  event: event.current,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedAnyEventViewProps => bindActionCreators({
  fetchEvent: actions.eventActions.fetchEventAsync.request,
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
)(AnyEventView);
