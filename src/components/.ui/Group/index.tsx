import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';


type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  title?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  type?: 'linear' | 'flex';
  content?: 'justify' | 'align-left' | 'align-right' | 'center';
  stretched?: boolean;
  reverse?: boolean;
}

const Group = ({
  orientation = 'horizontal',
  type = 'flex',
  content = 'justify',
  stretched = true,
  title, description, className, children, reverse, ...restProps
}: Props) => {
  const base = 'Group';
  return (
    <div {...restProps} className={classNames(base, className!, {
        [`${base}--orientation-${orientation}`]: true,
        [`${base}--type-${type}`]: true,
        [`${base}--content-${content}`]: true,
        [`${base}--stretched`]: stretched
      })}
    >
      {children}
    </div>
  )
};

export default Group;
