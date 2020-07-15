import React, { HTMLAttributes, Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classNames from '../../../lib/classNames';
import { HasChildren, ObjectClassNames } from '../../../.types/props';
import Group from '../Group';
import Button, { ButtonProps } from '../Button';
import Icon from '../Icon';

import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/icons/previous.svg';
import easeInOutQuad from '../../../lib/easeInOutQuad';
import Div from '../Div';
import cuid from 'cuid';

type State = typeof initialState 
type Props = HTMLAttributes<HTMLDivElement> & HasChildren & {
  orientation?: 'vertical' | 'horizontal';
  buttonProps: ButtonProps;
  isContentLoading?: boolean;
  loop?: boolean;
  autoscroll?: number;
  stretched?: boolean;
  minify?: boolean;
  contentClassName?: string;
}

const defaultProps = Object.freeze({
  orientation: 'vertical',
  isContentLoading: true,
  minify: false,
  buttonProps: {
    level: 'primary',
    size: 'l'
  }
})
const initialState = Object.freeze({ })


export default class ScrolledContent extends Component<Props, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = initialState

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true
  _isProcessing: boolean = false
  _moveDistance = 650
  _moveDuration = 450
  _movementCoeff = 1
  scroll = React.createRef<HTMLDivElement>()
  forwardButton = React.createRef<HTMLButtonElement>()
  backwardButton = React.createRef<HTMLButtonElement>()
  
  componentDidMount() {
    const { orientation } = this.props
    if (orientation === "horizontal")
      window.addEventListener('resize', () => this.moveForward(0));
    // this.startScrolling()
    this._handleScroll()
  }
  
  componentDidUpdate(prevProps) {
    const { isContentLoading, orientation } = this.props
    if (isContentLoading === prevProps.isContentLoading) return false;
    orientation === "horizontal" && this.moveForward(0);
    this._handleScroll();
  }
  
  componentWillUnmount() {
    this._isMounted = false
    window.removeEventListener('resize', () => this.moveForward(0));
    if (this._intervalId) clearInterval(this._intervalId)
  }
  
  _setDistance = (direction: "backward" | "forward" = "forward", coeff = this._movementCoeff) => {
    const $_this = ReactDOM.findDOMNode(this)
    const { current: scroll } = this.scroll
    if (!$_this || !($_this instanceof Element)) return false;
    if (!scroll) return false;
    const { width: containerWidth, left: containerLeft, right: containerRight } = $_this.getBoundingClientRect()
    const defaultMovement = containerWidth * coeff;
    const widthRemaining = direction === "forward"
      ? Math.ceil(scroll.scrollWidth - scroll.scrollLeft - containerWidth)
      : Math.ceil(scroll.scrollLeft);
    if (defaultMovement > widthRemaining) {
      return widthRemaining;
    }
    const refs = Object.values(this.refs);
    let eps = 99999;
    let epsDirection = 1;
    Array.prototype.forEach.call(refs, ref => {
      const node = ReactDOM.findDOMNode(ref)
      if (!node || !(node instanceof Element)) return false;
      const { right, left } = node.getBoundingClientRect()
      const leftRule = Math.round(left - defaultMovement - containerLeft)
      const rightRule = Math.round(right + defaultMovement - containerRight)
      const abs = direction === "forward"
        ? Math.abs(leftRule)
        : Math.abs(rightRule)
      if (abs < eps) {
        eps = abs;
        epsDirection = direction === "forward"
          ? leftRule < 0 ? - 1 : + 1
          : rightRule < 0 ? + 1 : - 1
      }
    })
    return Math.round(defaultMovement + eps * epsDirection);
  }

  _backwardClick = () => {
    this.moveBackward();
  }
  
  _forwardClick = () => {
    this.moveForward();
  }

  moveForward = (coeff?) => {
    const { scroll: { current }, _moveDuration, move } = this
    if (!current || this._isProcessing) return
    const distance = this._setDistance("forward", coeff)
    move(current, - distance, _moveDuration)
  }

  moveBackward = (coeff?) => {
    const { scroll: { current }, _moveDuration, move } = this
    if (!current || this._isProcessing) return
    const distance = this._setDistance("backward", coeff)
    move(current, distance, _moveDuration)
  }

  // startScrolling = () => {
  //   const { autoscroll, loop } = this.props
  //   if (autoscroll) this.autoscroll(autoscroll)
  // }

  // stopScrolling = () => {
  //   if (this._intervalId) clearInterval(this._intervalId)
  // }

  // _mouseMoving = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const { scroll: { current } } = this
  //   if (!current || !this._isMounted || e.buttons !== 1) return
  //   current.scrollTop -= e.movementY
  // }

  _handleScroll = () => {
    const { scroll: { current }, forwardButton: { current: forward }, backwardButton: { current: backward } } = this
    if (!current || !forward || !backward) return
    const { scrollLeft } = current
    if (scrollLeft <= 0) backward.classList.remove('active')
    else if (!backward.classList.contains('active')) backward.classList.add('active')

    if (scrollLeft >= current.scrollWidth - current.offsetWidth) forward.classList.remove('active')
    else if (!forward.classList.contains('active')) forward.classList.add('active')
  }

  move = (element, distance, duration) => {
    const { scrollLeft } = element
    const to = scrollLeft - distance
    const change = to - scrollLeft
    let currentTime = 0
    const increment = 10
    const foo = () => {
      this._isProcessing = true;
      currentTime += increment
      const offset = easeInOutQuad(currentTime, scrollLeft, change, duration)
      if (currentTime < duration) setTimeout(foo, increment)
      else this._isProcessing = false;
      element.scrollLeft = offset
    };
    foo();
  }

  // autoscroll = (speed) => {
  //   const { scroll: { current } } = this
  //   if (!current || !this._isMounted) return
  //   this._intervalId = setInterval(() => {
  //     current.scrollTop += speed
  //   }, 20)
  // }

  render() {
    const base = 'Scrolled';
    const {
      orientation,
      className = '',
      contentClassName = '',
      children,
      autoscroll,
      buttonProps,
      stretched = false,
      minify = false,
    } = this.props
    return (
      <Group {...{ orientation }} className={classNames(`${base}__wrapper`, className)}>
        {!autoscroll && orientation === 'horizontal' && (
          <Group
            className={classNames(`${base}__buttons`, {
              'atMiddle': stretched,
              'minify': minify,
            })}
            justify="space-between"
            content="center"
            {...{ stretched }}
          >
            <Button
              {...buttonProps}
              getRef={this.backwardButton}
              onClick={this._backwardClick}
              className={classNames(`${base}__button`)}
              before={(
                <Icon svg={PreviousIcon} noFill />
              )}
            />
            <Button 
              {...buttonProps}
              getRef={this.forwardButton}
              onClick={this._forwardClick}
              className={classNames(`${base}__button`)}
              before={(
                <Icon svg={NextIcon} noFill />
              )}
            />
          </Group>
        )}
        <div
          ref={this.scroll}
          // onMouseDown={autoscroll ? this.stopScrolling : () => {}}
          // onTouchStart={autoscroll ? this.stopScrolling : () => {}}
          // onMouseMove={autoscroll ? this._mouseMoving : () => {}}
          // onMouseUp={autoscroll ? this.startScrolling : () => {}}
          // onTouchEnd={autoscroll ? this.startScrolling : () => {}}
          onScroll={orientation === 'horizontal' ? this._handleScroll : () => {}}
          className={
            classNames(
              base,
              // className,
              `${base}--orientation-${orientation}`,
            )
          }
        >
          <Group className={contentClassName} {...{ orientation }} content="stretch">
            {orientation === 'vertical' && children}
            {orientation === 'horizontal' && (
              React.Children.map(children, (child, idx) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    ref: idx,
                  });
                }
              })
            )}
          </Group>
        </div>
      </Group>
    )
  }
}
