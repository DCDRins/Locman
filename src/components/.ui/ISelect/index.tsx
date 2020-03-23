import React, { HTMLAttributes } from 'react'
import Select, { SelectComponentsConfig } from 'react-select'
import classNames from '../../../lib/classNames'

type Props = SelectComponentsConfig & { }

const ISelect = ({
  onChange,
  value,
  options,
  ...restProps
}: Props) => {
  const base = "ISelect"
  return (
    <Select
      isMulti
      className={base}
      classNamePrefix={base}
      {...{ value }}
      {...{ onChange }}
      {...{ options }}
      {...restProps}
    />
  )
}

export default ISelect
