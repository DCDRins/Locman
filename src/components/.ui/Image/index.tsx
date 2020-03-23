
import React, { HTMLAttributes } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren } from '../../../.types/props';
import Group from '../Group';
import Input from '../Input';

export type Props = HTMLAttributes<HTMLDivElement>
& HasChildren
& {
  src?: string;
  height: number;
  width?: number;
  bordered?: boolean;
  editable?: boolean;
  rounded?: boolean;
}

const Image = ({
  src,
  height,
  width,
  children,
  bordered = false,
  editable = false,
  rounded = false,
  className = '',
  onChange,
  ...restProps
}: Props) => {
  const base = 'Image';
  return (
    <div
      {...restProps}
      style={{
        backgroundImage: `url('${src}')`,
        height,
        width,
        borderRadius: `${rounded && width && width * 0.5}px`,
      }}
      className={classNames(base, className, {
        [`${base}--bordered`]: bordered,
        [`${base}--editable`]: editable,
      })}
    >
      {editable && <input type="file" {...{ onChange }} />}
      <Group
        className={classNames(`${base}__children`, {
          'editable': editable,
          'editable--photo': editable && src !== undefined,
          'editable--empty': editable && src === undefined,
        })}
        content="center" justify="center" stretched
        style={{ borderRadius: `${rounded && width && width * 0.5}px` }}
      >
        {children}
      </Group>
    </div>
  )
}

export default Image
