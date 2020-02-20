import React, { Component } from 'react';
import { HasChildren } from '../../../common/types/props';
import Div from '../../.ui/Div';
import classNames from '../../../lib/classNames';
import getHashCode from '../../../lib/getHashCode';

type State = { }
type Props = typeof defaultProps
& HasChildren
& { }

const defaultProps = Object.freeze({ })
const initialState = Object.freeze({ })

// const getInitialSlide = ({ slideList }: Props) => slideList.slice().shift()
// declare function clearInterval(intervalId: NodeJS.Timeout): void;


export default class NavigationBar extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = initialState

  render() {
    const base = "Navigation-Bar";
    return (
      <div className={base}>
        <Div both>Home</Div>
        <Div both>About</Div>
        <Div both>Service</Div>
        <Div both className="separate">Settings</Div>
        <Div both>Privacy</Div>
        <Div both>Secure</Div>
      </div>
    )
  }
}
