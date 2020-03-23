import React, { ReactNode, InputHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import { HasFormStatus, HasRef } from '../../../.types/props';
import Group from '../Group';
import cuid from 'cuid';


type Props = HasFormStatus
& InputHTMLAttributes<HTMLInputElement>
& HasRef<HTMLInputElement> & {
  level?: 'default' | 'light';
  button?: ReactNode;
  hidden?: boolean;
  bordered?: boolean;
  // before?: ReactNode;
  // after?: ReactNode;
}

const Input = ({
  disabled = false,
  className = '',
  level = 'default',
  hidden = false,
  bordered = false,
  name = '',
  button,
  onKeyDown,
  // before,
  // after,
  getRef,
  ...restProps
}: Props) => {
  const base = 'Input';
  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13 || !onKeyDown) return false;
    onKeyDown(e);
  }
  return (
    <label
      className={classNames(base, className, 
        `${base}--level-${level}`, {
        [`${base}--disabled`]: disabled,
        [`${base}--hidden`]: hidden,
        [`${base}--bordered`]: bordered,
      })}
    >
      <Group content="center">
        <input
          ref={getRef}
          autoComplete="off"
          {...{ name }}
          id={cuid()}
          onKeyDown={_onKeyDown}
          {...restProps}
        />
        {button && button}
      </Group>
    </label>
  )
}

export default Input
