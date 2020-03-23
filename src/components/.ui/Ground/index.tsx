import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../.types/props';

type State = typeof initialState & { }
type Props = typeof defaultProps 
& HTMLAttributes<HTMLDivElement>
& HasChildren
& {
  src?: string;
  stretch: boolean;
  fit: boolean;
  layout?: 'top' | 'bottom'; // default center
  mask?: 'no' | 'both'; // default top
  video?: string;
}

const initialState = Object.freeze({
  parallaxValue: 0
})
const defaultProps = Object.freeze({
  stretch: false,
  limit: false,
  fit: false,
})

export default class Ground extends Component<Props, State> {
  readonly state: State = initialState
  static readonly defaultProps: Props = defaultProps
   _isMounted: boolean = true

  componentDidMount() {
    const { _handleScroll } = this
    document.addEventListener("scroll", _handleScroll)
  }
  
  componentWillUnmount() {
    this._isMounted = false
    document.removeEventListener("scroll", this._handleScroll, false)
  }

  _handleScroll = () => {
    const { _isMounted } = this
    _isMounted && this.setState({ parallaxValue: window.scrollY })
  }

  render() {
    const {
      src,
      children,
      stretch,
      layout,
      limit,
      video,
      mask,
      fit,
      className = '',
      ...restProps
    } = this.props

    const { parallaxValue } = this.state
    const base = 'Ground'

    const style = {
      backgroundImage: `url('${src}')`,
      // top: `-${parallaxValue * 0.005}%`
    }
    return (
      <div {...restProps} className={classNames(base, className, {
        [`${base}--layout-${layout}`]: layout !== undefined,
        [`${base}--limit`]: limit,
      })}>
        {video && (
          <div className={`${base}__image`}>
            <video autoPlay muted loop>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}
        {src && <div style={style} className={classNames(`${base}__image`, {
          [`${base}__image--mask-${mask}`]: mask !== undefined,
          [`${base}__image--fit`]: fit,
        })} />}
        <div className={classNames(`${base}__in`, {
          [`${base}__in--stretch`]: stretch,
        })}>
          {children}
        </div>
      </div>
    )
  };
}
