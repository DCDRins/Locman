import React, { Component } from 'react';
import { HasChildren } from '../../.types/props';
import Div from '../.ui/Div';
import classNames from '../../lib/classNames';
import Section from '../.ui/Section';
import { SliderBaseState } from '../../reducers/news-reducer';
import Ground from '../.ui/Ground';
import Group from '../.ui/Group';

type State = {
  currentSlideId: number;
  readyState: boolean;
}
type Props = typeof defaultProps & HasChildren & {
  actualData: SliderBaseState;
}
const defaultProps = Object.freeze({
  timeDuration: 5000, // after this changed -> change CSS animation time duration >>> animation: progress 5s linear forwards; <<<
})

export default class Slider extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = {
    currentSlideId: 0,
    readyState: false,
  }
  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true;

  componentDidUpdate(prevProps) {
    const { actualData: { data } } = this.props
    if (prevProps.actualData.data === data) return false;
    data && data.length > 1 && this.startInterval()
  }

  componentWillUnmount() {
    const { _intervalId } = this
    this._isMounted = false
    if (_intervalId) clearInterval(_intervalId)
  }

  startInterval = () => {
    const { timeDuration } = this.props
    const { nextSlide } = this
    this._intervalId = setInterval(() => {
      nextSlide()
    }, timeDuration)
  }

  nextSlide = () => {
    const { currentSlideId } = this.state
    const { actualData: { data } } = this.props
    const { _isMounted } = this
    data && _isMounted && this.setState({ currentSlideId: (currentSlideId + 1) % data.length });
  }

  handleClick = () => {
    const { nextSlide, startInterval, _intervalId } = this
    if (_intervalId) clearInterval(_intervalId)
    nextSlide()
    startInterval()
  }

  render() {
    const { currentSlideId, readyState } = this.state
    const { actualData: { data } } = this.props
    const base = "Slider";
    return (
      <Ground
        solid
        mask="dark-left"
        stretch
        limit
        src={data ? data[currentSlideId].previewImage.path : ''}
        className={base}
        onClick={this.handleClick}
      >
        {data && data.map(({ title, anons }, idx) => (
          <Section
            key={title}
            className={classNames(`${base}__slide`, {
              'active': idx === currentSlideId
            })}
            rotateOnMedia={false}
          >
            <Group content="start" orientation="vertical" className={`${base}__content`}>
              <Div className={`${base}__title`}>
                {title}
              </Div>
              <Div className={`${base}__description`}>
                {anons}
              </Div>
            </Group>
          </Section>
        ))}
        {data && (
          <Section>
            <Div className={`${base}__pointers`}>
              {data.map((_, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    `${base}__pointers__in`, {
                      'active': idx === currentSlideId,
                    }
                  )}
                >
                  <div className={`${base}__pointers__in--progress`} />
                </div>
              ))}
            </Div>
          </Section>
        )}
      </Ground>
    )
  }
}
