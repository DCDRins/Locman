import React, { HTMLAttributes, useRef, useState } from 'react'
import Group, { GroupProps } from '../Group'
import Div from '../Div'
import Button, { ButtonProps } from '../Button'
import { HasChildren } from '../../../.types/props'
import { ReactComponent as Up } from '../../../assets/icons/up.svg'
import { ReactComponent as Down } from '../../../assets/icons/down.svg'
import Icon from '../Icon'
import Input from '../Input'


type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  group?: Partial<GroupProps>;
  buttons?: Partial<ButtonProps>;
  step?: number;
  min?: number;
  max?: number;
  postfix?: string;
  field: {
    [key: string]: number;
  };
  handleChange: (field: string, value: number) => void;
}

const NumericUpDown = ({
    handleChange,
    group = {
      orientation: 'horizontal',
      content: 'center',
      justify: 'space-between',
    },
    title,
    buttons,
    step = 1,
    field,
    min = 0,
    max = 9999,
  ...restProps
}: Props) => {
  const base = 'Numeric-Up-Down';
  const key  = Object.keys(field)[0];
  const value  = Object.values(field)[0];
  
  const increment = () => {
    const summary = value + step;
    summary >= min && summary <= max && handleChange(key, summary)
  }
  const decrement = () => {
    const summary = value - step;
    summary >= min && summary <= max && handleChange(key, summary)
  }
  return (
    <Div both>
      <Group {...group} {...restProps} className={base}>
        {title && (
          <Div className={`${base}__title`}>
            {title}
          </Div>
        )}
        <Button
          {...buttons}
          before={<Icon svg={Down} />}
          onClick={decrement}
        />
        <Input
          {...{ value }}
          readOnly
          type="number"
          {...{ min }}
          {...{ max }}
          level="light"
        />
        <Button
          {...buttons}
          before={<Icon svg={Up} />}
          onClick={increment}
        />
      </Group>
    </Div>
  );
  
};

export default NumericUpDown;
