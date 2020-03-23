{/* <img src={searchIcon} alt="search" /> */}
import React, { HTMLAttributes, ComponentType, SVGProps } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../.types/props';

export type IconProps = HTMLAttributes<SVGSVGElement> & HasChildren & {
  size?: 's' | 'm' | 'l' | number;
  svg: ComponentType<SVGProps<SVGSVGElement>>;
  noFill?: boolean;
  noStroke?: boolean;
  isRect?: boolean;
}

const Icon = ({
  size = 's',
  svg: Svg,
  className = '',
  noFill = false,
  noStroke = false,
  isRect = false,
  ...restProps
}: IconProps) => {
  const style: {[k: string]: string} = {};
  const base = 'Icon';

  if (typeof size === 'number') {
    style.width = `${size}px`
    style.height = isRect ? `${size}px` : 'auto';
  }

  return (
    <Svg
      {...restProps}
      style={style}
      className={classNames(base, className, {
        [`${base}--size-${size}`]: typeof size !== 'number',
        [`${base}--no-fill`]: noFill,
        [`${base}--no-stroke`]: noStroke,
      })}
    />
  )
}

export default Icon
