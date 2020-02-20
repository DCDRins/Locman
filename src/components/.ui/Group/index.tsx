import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';


type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  title?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  content?: 'center' | 'start' | 'end';
  stretched?: boolean;
  reverse?: boolean;
}

const Group = ({
  orientation = 'horizontal',
  content = 'start',
  stretched = false,
  justify = 'space-between',
  className = '',
  title, description, children, reverse, ...restProps
}: Props) => {
  const base = 'Group';
  return (
    <div {...restProps} className={classNames(base, className, {
        [`${base}--orientation-${orientation}`]: true,
        [`${base}--content-${content}`]: true,
        [`${base}--justify-${justify}`]: true,
        [`${base}--stretched`]: stretched
      })}
    >
      {children}
    </div>
  )
};

export default Group;
