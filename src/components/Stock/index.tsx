import React, { Component } from 'react';
import { HasChildren } from '../../.types/props';
import UserContext from '../../common/context/user/user.context';
import Ground from '../.ui/Ground';
import Nav from './Nav';
import classNames from '../../lib/classNames';

type Props = HasChildren & typeof defaultProps & {}

const defaultProps = Object.freeze({
  hidden: true,
})

export default class Stock extends Component<Props, {}> {
  static readonly defaultProps: Props = defaultProps

  // maybe move hide-open methods from header class to this ???

  render() {
    const base = 'Stock'
    const { hidden } = this.props
    return (          
      <section className={classNames(base, {
        [`${base}--hidden`]: hidden,
      })}>
        <Ground>
          {/* <Nav className={base} /> */}
        </Ground>
      </section>
    )
  }
}
