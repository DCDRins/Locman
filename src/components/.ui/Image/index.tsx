
import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../common/types/props';
import Group from '../Group';

export type Props = HTMLAttributes<HTMLDivElement>
& HasChildren
& {
  src?: string;
  height: number;
  width?: number;
  bordered?: boolean;
}

const Image = ({
  src,
  height,
  width,
  children,
  bordered = false,
  className = '',
  ...restProps
}: Props) => (
  <div
    {...restProps}
    style={{ backgroundImage: `url('${src}')`, height, width }}
    className={classNames('Image', className, {
      ['Image--bordered']: bordered,
    })}
  >
    <Group content="center" justify="center" stretched>
      {children}
    </Group>
  </div>
)

export default Image
