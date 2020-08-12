import Types from 'MyTypes';
import React, { forwardRef } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import EventTile, { EventTileProps, DispatchedEventTileProps, StoredEventTileProps } from './view';

const mapStateToProps = ({ catalog }: Types.RootState): StoredEventTileProps => ({
  catalog: {
    tags: catalog.tags,
    event: catalog.event,
  }
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedEventTileProps => bindActionCreators({
  editEvent: actions.eventActions.editEventAsync.request,
  deleteEvent: actions.eventActions.deleteEventAsync.request,
  uploadImage: actions.eventActions.uploadImageAsync.request,
  uploadImageRange: actions.eventActions.uploadImageRangeAsync.request,
  deleteImageFromRange: actions.eventActions.deleteImageFromRangeAsync.request,
  fetchTagList: actions.catalogActions.fetchTagListAsync.request,
  openContext: actions.systemActions.openContext,
  closeContext: actions.systemActions.closeContext,
  openModal: actions.systemActions.openModal,
  closeModal: actions.systemActions.closeModal,
}, dispatch);

  
const ConnectedEventTile = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(EventTile);


export default forwardRef((props: EventTileProps, ref) =>
  <ConnectedEventTile {...props} getRef={ref} />
);

const ConnectedEvent = connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Event);

