import React, { InputHTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import getHashCode from '../../../lib/getHashCode'
import cuid from 'cuid'


                                                 //  & HasRef<HTMLInputElement>
export type Props = InputHTMLAttributes<HTMLInputElement> & {
  level?: 'office';
  align?: 'left' | 'center' | 'right';
  name: string;
}

const RadioButton = ({
  level = 'office',
  align = 'center',
  defaultChecked,
  checked,
  name = '',
  ...restProps
}: Props) => {
  const base = "Radio-Button"
  return (
    <label className={classNames(base, {
      [`${base}--active`]: checked === true || defaultChecked === true,
    })}>
      <input
        {...restProps}
        type="radio"
        id={getHashCode(name).toString()}
        {...{ name }}
      />
    </label>
  )
}

export default RadioButton
