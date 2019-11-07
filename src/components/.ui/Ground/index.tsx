import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

type State = typeof initialState & {}
type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  src?: string;
  layout?: 'top' | 'bottom' | 'both';
}
const initialState = {
  blur: 1,
}

export default class Ground extends Component<Props, State> {
  static initialState = initialState
  render() {
    const { children, className, src, layout, ...restProps } = this.props;
  const base = 'Ground';
    return (
      <div {...restProps} className={classNames(base, className!, {
          [`${base}--layout-${layout}`]: layout !== undefined,
        })}
      >
        {src && <div style={{ backgroundImage: `url('https://www.culture.ru/storage/images/26a1a55832058488cb3ed65dc746947d/a0ea11abe72e350b3410f6a8dedc8e5d.jpg')` }} className={`${base}__image`} />}
        <div className={`${base}__in`}>
          {children}
        </div>
      </div>
    )
  };
}
