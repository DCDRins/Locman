import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';
import Group from '../Group';
import Button from '../Button';
import Icon from '../Icon';

import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/icons/previous.svg';
import easeInOutQuad from '../../../lib/easeInOutQuad';

type State = typeof initialState 
type Props = HTMLAttributes<HTMLDivElement> & HasChildren & {
  orientation?: 'vertical' | 'horizontal';
  loop?: boolean;
  autoscroll?: number;
  // allowMedia: boolean;
  fit: boolean;
}

const defaultProps = Object.freeze({
  orientation: 'vertical',
  // allowMedia: false,
  fit: false,
})
const initialState = Object.freeze({
  atStartPoint: true,
  onEndPoint: false,
})


export default class ScrolledContent extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = initialState

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true
  _moveDistance = 500
  _moveDuration = 350
  scroll = React.createRef<HTMLDivElement>()
  
  componentDidMount() {
    this._startScrolling()
    this._handleScroll()
  }
  
  componentWillUnmount() {
    this._isMounted = false
    if (this._intervalId) clearInterval(this._intervalId)
  }

  _backwardClick = () => {
    const { scroll: { current }, _moveDistance, _moveDuration, move } = this
    if (!current) return
    move(current, _moveDistance, _moveDuration)
  }

  _forwardClick = () => {
    const { scroll: { current }, _moveDistance, _moveDuration, move } = this
    if (!current) return
    move(current, - _moveDistance, _moveDuration)
  }

  _startScrolling = () => {
    const { autoscroll, loop } = this.props
    if (autoscroll) this.autoscroll(autoscroll)
  }

  _stopScrolling = () => {
    if (this._intervalId) clearInterval(this._intervalId)
  }

  _mouseMoving = (e: React.MouseEvent<HTMLDivElement>) => {
    const { scroll: { current } } = this
    if (!current || !this._isMounted || e.buttons !== 1) return
    current.scrollTop -= e.movementY
  }

  _handleScroll = () => {
    const { scroll: { current } } = this
    if (!current) return
    const { scrollLeft } = current
    scrollLeft === 0 ?  this.setState({ atStartPoint: true }) : this.setState({ atStartPoint: false })
    scrollLeft === current.scrollWidth - current.offsetWidth ?  this.setState({ onEndPoint: true }) : this.setState({ onEndPoint: false })
  }

  move = (element, distance, duration) => {
    const { scrollLeft } = element
    const to = scrollLeft - distance
    const change = to - scrollLeft
    let currentTime = 0
    const increment = 10
    const foo = () => {
      // this.processing = true;
      currentTime += increment
      const offset = easeInOutQuad(currentTime, scrollLeft, change, duration)
      if (currentTime < duration) setTimeout(foo, increment)
      // else this.processing = false;
      element.scrollLeft = offset
    };
    foo();
  }

  autoscroll = (speed) => {
    const { scroll: { current } } = this
    if (!current || !this._isMounted) return
    this._intervalId = setInterval(() => {
      current.scrollTop += speed
    }, 20)
  }

  render() {
    const base = 'Scrolled';
    const {
      orientation,
      className = '',
      children,
      autoscroll,
      fit,
    } = this.props
    const { atStartPoint, onEndPoint } = this.state
    return (
      <Group {...{ orientation }} className={`${base}__wrapper`}>
        {!autoscroll && (
          <>
            <Button className={classNames(`${base}__button`, {
                [`${base}__button--active`]: !atStartPoint,
              })} before={<Icon svg={PreviousIcon} />} level="primary"
              onClick={this._backwardClick}
            />
            <Button className={classNames(`${base}__button`, {
                [`${base}__button--active`]: !onEndPoint,
              })} before={<Icon svg={NextIcon} />} level="primary"
              onClick={this._forwardClick}
            />
          </>
        )}
        <div
          ref={this.scroll}
          onMouseDown={autoscroll ? this._stopScrolling : () => {}}
          onTouchStart={autoscroll ? this._stopScrolling : () => {}}
          onMouseMove={autoscroll ? this._mouseMoving : () => {}}
          onMouseUp={autoscroll ? this._startScrolling : () => {}}
          onTouchEnd={autoscroll ? this._startScrolling : () => {}}
          onScroll={this._handleScroll}
          className={
            classNames(
              base,
              className,
              `${base}--orientation-${orientation}`, {
                // [`${base}--media`]: allowMedia,
                [`${base}--fit`]: fit,
              }
            )
          }
        >
          {children}
        </div>
      </Group>
    )
  }
}
