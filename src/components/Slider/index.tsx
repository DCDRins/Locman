import React, { Component } from 'react';
import { HasChildren } from '../../common/types/props';
import classNames from '../../lib/classNames';
import Div from '../.ui/Div';
import { Slide } from './types';

// todo -> make timeline for each slide

type State = typeof initialState & {}
type Props = typeof defaultProps & HasChildren & {
  slideList?: Array<Slide>;
}
const initialState = Object.freeze({
  currentSlide: 0,
})
const defaultProps = Object.freeze({
  isLoading: true,
  timeDuration: 5000, // One slide stands for 5 sec by default
})

export default class Slider extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  static state: State = initialState
  
  componentDidMount() {

  }

  render() {
    return (
      <section className="Slider">
        
      </section>
    )
  }
}
