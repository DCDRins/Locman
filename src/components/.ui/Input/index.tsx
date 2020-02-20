import React, { HTMLAttributes, ReactNode, FormEvent, InputHTMLAttributes, SVGAttributes, useEffect } from 'react'
import classNames from '../../../lib/classNames'
import Icon, { IconProps } from '../Icon'
import { HasFormStatus, HasRef } from '../../../common/types/props';
import Group from '../Group';
import Button from '../Button';


type Props = HasFormStatus
& InputHTMLAttributes<HTMLInputElement>
& HasRef<HTMLInputElement> & {
  design?: 'default' | 'light';
  button?: ReactNode;
  // before?: ReactNode;
  // after?: ReactNode;
}

const Input = ({
  disabled = false,
  className = '',
  design = 'default',
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
        `${base}--type-${design}`, {
        [`${base}--disabled`]: disabled,
      })}
    >
      <Group content="center">
        <input
          ref={getRef}
          autoComplete="off"
          onKeyDown={_onKeyDown}
          {...restProps}
        />
        {button && button}
      </Group>
    </label>
  )
}

export default Input
