import React from 'react'
import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import News, { DispatchedNewsProps, NewsProps } from './view';
import { forwardRef } from 'react';

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedNewsProps => bindActionCreators({
  closeContext: actions.systemActions.closeContext,
  openContext: actions.systemActions.openContext,
}, dispatch);


const ConnectedNews = connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(News);

export default forwardRef((props: NewsProps, ref) =>
  <ConnectedNews {...props} getRef={ref} />
);
