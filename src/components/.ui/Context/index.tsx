import React, { HTMLAttributes, ReactNode } from 'react'
import classNames from '../../../lib/classNames'
import { HasChildren } from '../../../common/types/props'
import Div from '../Div'
import Icon from '../Icon'
import { ReactComponent as AboutIcon } from '../../../assets/icons/about.svg';


type ContextProps = HTMLAttributes<HTMLElement> & HasChildren & { }

const Context = ({ className, children, ...restProps }: ContextProps) => {
  const base = "Context"
    return (
      <div {...restProps} className={classNames(base, className!)}>
        <div className={`${base}__main`}>
          <div>
            <Icon svg={AboutIcon} />
            Личный кабинет
          </div>
          <div>
            <Icon svg={AboutIcon} />
            Настройки
          </div>
          <div>
            <Icon svg={AboutIcon} />
            Выйти
          </div>
        </div>
      </div>
    )
};

export default Context;
