import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../.types/props';

export type DivProps = HTMLAttributes<HTMLDivElement> & HasChildren & {
  both?: boolean;
  half?: boolean;
}

export const Div = ({ className = '', children, both = false, half = false, ...restProps }: DivProps) => {
  const base = 'Div'
  return (
    <div {...restProps} className={classNames(base, className, {
      [`${base}--both`]: both,
      [`${base}--half`]: half,
    })}>
      {children}
    </div>
  );
};

export default Div;
