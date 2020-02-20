import React, { Component } from 'react';
import { HasChildren } from '../../common/types/props';
import UserContext from '../../common/context/user/user.context';
import Ground from '../.ui/Ground';
import AuthGround from '../../connected/auth-ground-connected-bind-action-creators';
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
      <UserContext.Consumer>
          {({ authenticated }) => (
          <section className={classNames(base, {
            [`${base}--hidden`]: hidden,
          })}>
            <Ground>
              {authenticated
                ? <Nav className={base} />
                : <AuthGround />
              }
            </Ground>
            {/* Content */}
          </section>
        )}
      </UserContext.Consumer>
    )
  }
}
