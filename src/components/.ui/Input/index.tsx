import React, { ReactNode, InputHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import { HasFormStatus, HasRef } from '../../../.types/props';
import Group from '../Group';


export type InputProps = HasFormStatus
& InputHTMLAttributes<HTMLInputElement>
& HasRef<HTMLInputElement> & {
  level?: 'default' | 'light';
  hidden?: boolean;
  bordered?: boolean;
  after?: ReactNode;
}

const Input = ({
  disabled = false,
  className = '',
  level = 'default',
  hidden = false,
  bordered = false,
  onKeyDown,
  after,
  getRef,
  ...restProps
}: InputProps) => {
  const base = 'Input';
  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <input
          onKeyDown={_onKeyDown}
          ref={getRef}
          {...restProps}
        />
        {after && after}
      </Group>
    </label>
  )
}

export default Input
