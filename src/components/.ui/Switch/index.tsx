import React, { InputHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import getHashCode from '../../../lib/getHashCode'


                                                 //  & HasRef<HTMLInputElement>
export type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  level?: 'office';
  switchSize?: 's' | 'm' | 'l';
  align?: 'left' | 'center' | 'right';
}

const Switch = ({
  switchSize = "m",
  level = 'office',
  align = 'center',
  onChange,
  ...restProps
}: SwitchProps) => {
  const base = "Switch"
  return (
    <label className={classNames(base,
      `size-${switchSize}`, {
      [`${base}--active`]: restProps.defaultChecked === true || restProps.checked === true,
    })}>
      <input
        {...restProps}
        type="checkbox"
        id={name}
        onChange={e => {
          onChange && onChange(e);
        }}
      />
    </label>
  )
}

export default Switch
