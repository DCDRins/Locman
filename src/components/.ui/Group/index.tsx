import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';


export type GroupProps = HTMLAttributes<HTMLElement> & HasChildren & {
  title?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  content?: 'center' | 'start' | 'end';
  stretched?: boolean | 'x' | 'y';
  reverse?: boolean;
  rotateOnMedia?: boolean;
}

const Group = ({
  orientation = 'horizontal',
  content = 'start',
  stretched = false,
  justify = 'space-between',
  className = '',
  rotateOnMedia = false,
  title, description, children, reverse, ...restProps
}: GroupProps) => {
  const base = 'Group';
  return (
    <div {...restProps} className={classNames(base, className, {
        [`${base}--orientation-${orientation}`]: true,
        [`${base}--content-${content}`]: true,
        [`${base}--justify-${justify}`]: true,
        [`${base}--stretched`]: stretched === true,
        [`${base}--stretched-${stretched}`]: typeof stretched === 'string',
        // [`${base}--media`]: rotateOnMedia,
      })}
    >
      {children}
    </div>
  )
};

export default Group;
