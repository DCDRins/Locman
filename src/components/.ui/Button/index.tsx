import React, { HTMLAttributes, ReactNode, DOMAttributes } from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../../lib/classNames';
import { HasChildren, HasRootRef } from '../../../common/types/props';
import { Route } from '../../../common/routes';
import Icon from '../Icon';


type ButtonProps = HTMLAttributes<HTMLElement> & HasChildren & {
  level?: 'primary' | 'secondary' | 'outline' | 'simple',
  size?: 's' | 'm' | 'l' | 'xl',
  align?: 'left' | 'center' | 'right',
  route?: Route;
  stretched?: boolean,
  before?: ReactNode;
  after?: ReactNode;
  stopPropagation?: boolean;
  /**
   * @ignore
   */
  disabled?: boolean;
}

const Button = ({
  level = 'primary',
  size = 'm',
  align = 'center',
  stretched = false,
  stopPropagation = true,
  route, before, after, disabled, className, children, ...restProps }: ButtonProps) => {
    const button = (
      <div {...restProps} role="button" className={classNames('Button', className!, {
        [`Button--size-${size}`]: true,
        [`Button--level-${level}`]: true,
        [`Button--align-${align}`]: true,
        [`Button--stretched`]: stretched
      })} 
    >
      <div className="Button__in">
        {/* route icons priority > before */}
        {route && route.icon ? (
          <div className="Button__before">
            <Icon svg={route.icon} />
          </div>
        ) : (
          before && <div className="Button__before">{before}</div>
        )}
        {children && <div className="Button__content">{children}</div>}
        {after && <div className="Button__after">{after}</div>}
      </div>
    </div>
    )
    return route ? <Link to={route.absolutePath}>{button}</Link> : button
};

export default Button;
