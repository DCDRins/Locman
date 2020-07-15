import React, { HTMLAttributes } from 'react'
import Select, { SelectComponentsConfig } from 'react-select'
import classNames from '../../../lib/classNames'
import Div from '../Div'


/** https://github.com/JedWatson/react-select */

const customStyles = {
  control: (provided, state) => {
    const border = state.isFocused ? '1px solid transparent!important' : '1px solid #eee';
    const borderRadius = '3px';
    return { ...provided, borderRadius, border };
  },
  option: provided => {
    const fontSize = '10pt';
    return { ...provided, fontSize };
  },
  singleValue: provided => {
    const fontSize = '10pt';
    const fontWeight = '700';
    return { ...provided, fontSize, fontWeight };
  },
  multiValue: provided => {
    const backgroundColor = '#efefef';
    const border = '1px solid #eee';
    return { ...provided, backgroundColor, border };
  },
  multiValueLabel: provided => {
    const padding = '4px';
    const fontSize = '9pt';
    const fontWeight = '500';
    return { ...provided, padding, fontSize, fontWeight };
  }
}

type Props = SelectComponentsConfig & {
  title?: string;
  lightMode?: boolean;
}

const ISelect = ({
  title,
  lightMode = false,
  ...restProps
}: Props) => {
  const base = "ISelect"
  return (
    <Div both className={classNames(base, {
      'light': lightMode,
    })}>
      {title && (
        <Div className={`${base}__title`}>
          {title}
        </Div>
      )}
      <Select
        styles={customStyles}
        className={`${base}-container`}
        classNamePrefix={base}
        {...restProps}
      />
    </Div>
  )
}

export default ISelect
