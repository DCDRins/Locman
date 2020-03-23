import React, { HTMLAttributes, ReactNode, useEffect, Component } from 'react'
import classNames from '../../../lib/classNames'
import getHashCode from '../../../lib/getHashCode'


                                                 //  & HasRef<HTMLInputElement>
export type Props = HTMLAttributes<HTMLInputElement> & {
  level?: 'office';
  size?: 's' | 'm' | 'l';
  align?: 'left' | 'center' | 'right';
  name: string;
}

const Switch = ({
  size = 'm',
  level = 'office',
  align = 'center',
  defaultChecked,
  name = '',
  onChange,
  ...restProps
}: Props) => {
  const base = "Switch"
  return (
    <label className={classNames(base,
      `size-${size}`, {
      [`${base}--active`]: defaultChecked === true,
    })}>
      <input
        {...restProps}
        type="checkbox"
        {...{ name }}
        id={getHashCode(name).toString()}
        {...{ defaultChecked }}
        onChange={e => {
          onChange && onChange(e);
        }}
      />
    </label>
  )
}

export default Switch
