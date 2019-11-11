import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

type State = typeof initialState & {}
type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  src?: string;
  // layout?: 'top' | 'bottom' | 'both';
}
const initialState = {
  blur: 5,
}

export default class Ground extends Component<Props, State> {
  readonly state: State = initialState

  render() {
    const { children, className, src, ...restProps } = this.props
    const { blur } = this.state
    const base = 'Ground';
    return (
      <div {...restProps} className={classNames(base, className!, 
          // {[`${base}--layout-${layout}`]: layout !== undefined,}
        )}
      >
        {src && <div style={{ backgroundImage: `url('https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg')` }} className={`${base}__image`} />}
        <div className={`${base}__in`}>
          {children}
        </div>
      </div>
    )
  };
}
