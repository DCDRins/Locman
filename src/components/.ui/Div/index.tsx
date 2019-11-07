import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren, HasRootRef } from '../../../common/types/props';

type DivProps = HTMLAttributes<HTMLDivElement> & HasChildren & {

}

export const Div = ({ className, children, ...restProps }: DivProps) => {
  return (
    <div {...restProps} className={classNames('Div', className!)}>
      {children}
    </div>
  );
};

export default Div;
