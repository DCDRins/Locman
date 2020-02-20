import React from 'react'
import { HasChildren, HasClassName } from '../../../common/types/props'
import classNames from '../../../lib/classNames'

type Props = HasChildren & HasClassName & { }

export const FixedLayout = ({
  children,
  className = '',
  ...restProps
}: Props) => {
  const base = 'Fixed-Layout'
  return (
    <div {...restProps} className={classNames(base, className)}>
      {children}
    </div>
  );
}

export default FixedLayout
