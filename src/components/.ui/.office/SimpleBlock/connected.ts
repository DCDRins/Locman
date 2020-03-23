import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import SimpleBlock, { DispatchedSimpleBlockProps, StoredSimpleBlockProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredSimpleBlockProps => ({
  tags: event.tags.data,
  isTagsLoading: event.tags.isLoading,
  tagsError: event.tags.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedSimpleBlockProps => bindActionCreators({
  createEvent: actions.eventActions.createEventAsync.request,
  editEvent: actions.eventActions.editEventAsync.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
  // fetchTagList: actions.eventActions.fetchTagListAsync.request,
  uploadImage: actions.eventActions.uploadImageAsync.request,
}, dispatch);


export const SimpleBlockConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleBlock);

