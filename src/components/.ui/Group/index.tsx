import React, { HTMLAttributes, useRef, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren, HasRef } from '../../../.types/props';


export type GroupProps = HTMLAttributes<HTMLElement> & HasChildren & HasRef<HTMLDivElement> & {
  title?: string;
  description?: string;
  orientation?: 'vertical' | 'horizontal';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  content?: 'center' | 'start' | 'end' | 'stretch';
  stretched?: boolean | 'x' | 'y';
  reverse?: boolean;
  inline?: boolean;
  rotateOnMedia?: boolean;
}

export default class Group extends Component<GroupProps> {
  render() {
    const {
      orientation = 'horizontal',
      content = 'start',
      stretched = false,
      justify = 'space-between',
      className = '',
      rotateOnMedia = false,
      inline = false,
      getRef,
      title, description, children, reverse, ...restProps
    } = this.props;
    const base = 'Group';
    return (
      <div {...restProps} ref={getRef} className={classNames(base, className, {
          [`${base}--orientation-${orientation}`]: true,
          [`${base}--content-${content}`]: true,
          [`${base}--justify-${justify}`]: true,
          [`stretched`]: stretched === true,
          [`stretched--${stretched}`]: typeof stretched === 'string',
          'media': rotateOnMedia,
          'inline': inline,
        })}
      >
        {children}
      </div>
    )
  };
}
