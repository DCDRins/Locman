import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

type DivProps = HTMLAttributes<HTMLDivElement> & HasChildren & {
  both?: boolean;
}

export const Div = ({ className = '', children, both = false, ...restProps }: DivProps) => {
  const base = 'Div'
  return (
    <div {...restProps} className={classNames(base, className, {
      [`${base}--both`]: both,
    })}>
      {children}
    </div>
  );
};

export default Div;
