import React, { HTMLAttributes, ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../lib/classNames'
import { HasChildren, HasRef } from '../../../.types/props'
import { Route } from '../../../common/dictionaries/routes'
import Icon from '../Icon'
import Group from '../Group'


export type ButtonProps = HTMLAttributes<HTMLButtonElement>
& HasChildren
& HasRef<HTMLButtonElement>
& {
  level?: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'simple' | 'tag'
  | 'office-primary' | 'office-secondary' | 'office-tertiary' | 'office-alert',
  size?: 's' | 'm' | 'l' | 'xl',
  align?: 'left' | 'center' | 'right',
  route?: Route;
  allowMedia?: boolean;
  before?: ReactNode;
  after?: ReactNode;
  permanent?: boolean;
  showIcon?: boolean;
  angular?: boolean;
  stretched?: boolean | 'x' | 'y';
  /**
   * @ignore
   */
  disabled?: boolean;
}


const Button = ({
  level = 'primary',
  size = 'm',
  align = 'center',
  title,
  className = '',
  permanent = false,
  allowMedia = false,
  showIcon = false,
  hidden = false,
  angular = false,
  stretched = false,
  disabled = false,
  route, before, after, children, ...restProps }: ButtonProps) => {
    const button = (
      <button
        {...restProps}
        {...{ disabled }}
        type="submit"
        role="button"
        tabIndex={route ? -1 : 0}
        className={classNames('Button', className, {
          [`Button--level-${level}`]: true,
          [`Button--level-${level}--permanent`]: permanent,
          [`Button--align-${align}`]: true,
          [`Button--media`]: allowMedia,
          [`Button--show-icon`]: showIcon,
          [`Button--only-icon`]: children === undefined,
          [`Button--hidden`]: hidden,
          [`Button--has-corners`]: angular,
          [`Button--disabled`]: disabled,
          [`stretched`]: stretched === true,
          [`stretched--${stretched}`]: typeof stretched === 'string',
        })} 
      >
        <Group
          content="center"
          justify="center"
          stretched
          className={classNames('Button__in', {
            [`Button__in--size-${size}`]: true,
            [`stretched`]: typeof stretched === 'boolean',
            [`stretched--${stretched}`]: typeof stretched === 'string',
          })}
          tabIndex={-1}
        >
          {route && route.icon ? (
            <div className="Button__before">
              <Icon svg={route.icon} />
            </div>
          ) : (
            before && <div className="Button__before">{before}</div>
          )}
          {children && <div className="Button__content">{children}</div>}
          {title && <div className="Button__content">{title}</div>}
          {after && <div className="Button__after">{after}</div>}
        </Group>
      </button>
    )
    return route ? <Link to={route.absolutePath}>{button}</Link> : button
};

export default Button;
