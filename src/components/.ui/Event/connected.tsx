import React from 'react'
import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Event, { DispatchedEventProps, EventProps } from './view';
import { forwardRef } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedEventProps => bindActionCreators({
  closeContext: actions.systemActions.closeContext,
  openContext: actions.systemActions.openContext,
}, dispatch);


const ConnectedEvent = connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Event);

export default forwardRef((props: EventProps, ref) =>
  <ConnectedEvent {...props} getRef={ref} />
);
