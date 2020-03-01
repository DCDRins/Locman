import React, { HTMLAttributes } from 'react'
import classNames from '../../../lib/classNames'
import Icon, { IconProps } from '../Icon'
import Group from '../Group'
import { ReactComponent as PreloaderIcon } from '../../../assets/icons/preloader.svg'
import Div from '../Div'


type Props = HTMLAttributes<HTMLDivElement> & Partial<IconProps> & {
  isLoading: boolean;
}


const Preloader = ({
  size = 100,
  isLoading = true,
  ...restProps
}: Props) => {
  const base = "Preloader";

  return (
    <Group
      stretched="y"
      content="center"
      justify="center"
      className={classNames(base, {
        [`${base}--hidden`]: !isLoading,
      })}
    >
      <Div both>
        <Icon svg={PreloaderIcon} {...{ size }} />
      </Div>
    </Group>
  );
  
};

export default Preloader;
