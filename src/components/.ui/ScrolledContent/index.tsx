import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  orientation?: 'vertical' | 'horizontal';
}

const ScrolledContent = ({ orientation = 'vertical', className, children }: Props) => {
  const base = 'Scrolled';
  return (
    <div className={classNames(base, className!, `${base}--orientation-${orientation}`,)}>
      {children}
    </div>
  )
}

export default ScrolledContent
