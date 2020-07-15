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
  mask?: 'no' | 'both' | 'radial'; // default bottom
  minHeight?: number | 'auto';
  video?: string;
  blur?: boolean;
  solid?: boolean;
}

const initialState = Object.freeze({
  imageLoaded: false,
})
const defaultProps = Object.freeze({
  stretch: false,
  limit: false,
  fit: false,
  blur: false,
  solid: false,
  // minHeight: 400,
})

export default class Ground extends Component<Props, State> {
  readonly state: State = initialState
  static readonly defaultProps: Props = defaultProps

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidUpdate(prevProps) {
    const { src } = this.props
    const { src: prevSrc } = prevProps

    if (prevSrc === src) return false;
    this.setState({ imageLoaded: false })
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  _onLoad = () => {
    if (!this._isMounted) return false;
    this._intervalId = setTimeout(() => {
      this.setState({ imageLoaded: true })
    }, 20)
  }

  render() {
    const {
      src,
      minHeight,
      children,
      stretch,
      layout,
      limit,
      solid,
      video,
      blur,
      mask,
      fit,
      className = '',
      ...restProps
    } = this.props;

    const { imageLoaded } = this.state

    const base = 'Ground'
    return (
      <div {...restProps} className={classNames(base, className, {
          [`${base}--layout-${layout}`]: layout !== undefined,
          [`${base}--limit`]: limit,
          'blur': blur,
          'solid': solid,
        })}
        style={{ minHeight }}
      >
        {video && (
          <div className={`${base}__image`}>
            <video autoPlay muted loop>
              <source src={video} type="video/mp4" />
            </video>
          </div>
        )}
        <img src={src} style={{ display: 'none' }} onLoad={this._onLoad} />
        {src && <div style={{ backgroundImage: `url(${src})` }} className={classNames(`${base}__image`, {
            [`mask-${mask}`]: mask !== undefined,
            'fit': fit,
            'active': imageLoaded
          })} />
        }
        <div className={classNames(`${base}__in`, {
          [`${base}__in--stretch`]: stretch,
        })}>
          {children}
        </div>
      </div>
    )
  };
}
