import React, { Component } from 'react';
import Header from '../Header';
import { HasChildren } from '../../.types/props';
import Context from '../.ui/Context';

interface Props extends HasChildren { }

export default class FixedLayout extends Component<Props, {}> {
  render() {
    const base = 'Fixed-Layout'
    // const { children } = this.props;
    return (
      <div className={base}>
        <Header />
        <Context />
        {/* {children} */}
      </div>
    )
  }
}
