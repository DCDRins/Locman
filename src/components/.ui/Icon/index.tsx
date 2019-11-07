{/* <img src={searchIcon} alt="search" /> */}
import React, { HTMLAttributes, ComponentType, SVGProps } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

type Props = HTMLAttributes<HTMLElement> & HasChildren & {
  size?: 's' | 'm' | 'l';
  svg: ComponentType<SVGProps<SVGSVGElement>>;
}

const Icon = ({
  size = 's',
  svg: Svg,
  className }: Props) => {
  const base = 'Icon';
  return (
    <Svg className={classNames(base, className!,
      `${base}--size-${size}`
      )}
    />
  )
}

export default Icon
