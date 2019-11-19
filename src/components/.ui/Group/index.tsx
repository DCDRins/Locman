import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';


type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  title?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  justify?: 'left' | 'center' | 'right';
  content?: 'center' | 'start';
  stretched?: boolean;
  reverse?: boolean;
}

const Group = ({
  orientation = 'horizontal',
  content = 'start',
  stretched = false,
  justify = 'left',
  title, description, className, children, reverse, ...restProps
}: Props) => {
  const base = 'Group';
  return (
    <div {...restProps} className={classNames(base, className!, {
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
