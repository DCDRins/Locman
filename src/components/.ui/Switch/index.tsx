import React, { InputHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import getHashCode from '../../../lib/getHashCode'


                                                 //  & HasRef<HTMLInputElement>
export type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  level?: 'office';
  switchSize?: 's' | 'm' | 'l';
}

const Switch = ({
  switchSize = "m",
  level = 'office',
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
        {...{ onChange }}
        type="checkbox"
        id={name}
      />
    </label>
  )
}

export default Switch
