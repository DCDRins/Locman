import React, { HTMLAttributes } from 'react'
import ReactDOM from 'react-dom'
import classNames from '../../../lib/classNames'
import Icon, { IconProps } from '../Icon'
import Group from '../Group'
import { ReactComponent as PreloaderIcon } from '../../../assets/icons/preloader.svg'
import Div from '../Div'
import { HasRef } from '../../../.types/props'


type Props = HTMLAttributes<HTMLDivElement> & Partial<IconProps> & {
  isLoading: boolean;
  global?: boolean;
}

const Preloader = ({
  size = 100,
  isLoading = true,
  global = false,
  ...restProps
}: Props) => {
  const base = "Preloader";
  const component = (
    <Group
      stretched="y"
      content="center"
      justify="center"
      className={classNames(base, {
        'hidden': !isLoading,
        'global': global,
      })}
    >
      {/* <Div both> */}
      <Icon svg={PreloaderIcon} {...{ size }} />
      {/* </Div> */}
    </Group>
  );
  if (global && isLoading) {
    return ReactDOM.createPortal(
      component,
      document.body,
    )
  }
  return component;
};

export default Preloader;
