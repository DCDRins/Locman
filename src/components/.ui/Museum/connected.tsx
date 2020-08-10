import React from 'react'
import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Museum, { DispatchedMuseumProps, MuseumProps } from './view';
import { forwardRef } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedMuseumProps => bindActionCreators({
  closeContext: actions.systemActions.closeContext,
  openContext: actions.systemActions.openContext,
}, dispatch);

const ConnectedMuseum = connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Museum);

export default forwardRef((props: MuseumProps, ref) =>
  <ConnectedMuseum {...props} getRef={ref} />
);

