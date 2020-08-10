import React, { ReactNode, TextareaHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import { HasFormStatus, HasRef } from '../../../.types/props';
import Group from '../Group';


export type TextareaProps = HasFormStatus
& TextareaHTMLAttributes<HTMLTextAreaElement>
& HasRef<HTMLTextAreaElement> & {
  level?: 'default' | 'light';
  hidden?: boolean;
  bordered?: boolean;
  after?: ReactNode;
}

const Textarea = ({
  disabled = false,
  className = '',
  level = 'default',
  hidden = false,
  bordered = false,
  onKeyDown,
  after,
  getRef,
  ...restProps
}: TextareaProps) => {
  const base = 'Textarea';
  const _onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode !== 13 || !onKeyDown) return false;
    onKeyDown(e);
  }
  return (
    <label
      className={classNames(base, className, 
        `level-${level}`, {
        [`${base}--disabled`]: disabled,
        [`${base}--hidden`]: hidden,
        [`${base}--bordered`]: bordered,
      })}
    >
      <Group content="center" stretched>
        <textarea
          onKeyDown={_onKeyDown}
          ref={getRef}
          {...restProps}
        />
        {after && after}
      </Group>
    </label>
  )
}

export default Textarea
