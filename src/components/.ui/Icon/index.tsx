{/* <img src={searchIcon} alt="search" /> */}
import React, { HTMLAttributes, ComponentType, SVGProps } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';

export type IconProps = HTMLAttributes<SVGSVGElement> & HasChildren & {
  size?: 's' | 'm' | 'l' | number;
  svg: ComponentType<SVGProps<SVGSVGElement>>;
}

const Icon = ({
  size = 's',
  svg: Svg,
  className = '',
  ...restProps
}: IconProps) => {
  const style: {[k: string]: string} = {};
  const base = 'Icon';

  if (typeof size === 'number') {
    style.width = `${size}px`
    // style.height = `${size}px`
  }

  return (
    <Svg
      {...restProps}
      style={style}
      className={classNames(base, className, {
        [`${base}--size-${size}`]: typeof size !== 'number'
      })}
    />
  )
}

export default Icon
