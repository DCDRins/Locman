import React, { Component, HTMLAttributes, ReactNode } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { HasChildren, HasRouterProps } from '../../../common/types/props'
import LangContext from '../../../common/context/lang/lang.context'
import { withLanguage } from '../../../common/lang'
import terms from '../../../common/terms'
import classNames from '../../../lib/classNames'

type Props = HasChildren
& HTMLAttributes<HTMLElement>
& HasRouterProps
& typeof defaultProps
& {
  header?: withLanguage | string;
  before?: ReactNode;
  side?: ReactNode;
  after?: ReactNode;
  // subsection: boolean;
}
const defaultProps = Object.freeze({
  rotateOnMedia: true,
  className: '',
  unfollow: false,
  stretch: false,
})

class Section extends Component<Props, {}> {
  static readonly defaultProps = defaultProps

  render() {
    const {
      header,
      className,
      children,
      before,
      side,
      after,
      rotateOnMedia,
      unfollow,
      stretch,
      match: { params },
    } = this.props
    const base = 'Section'
    const minifyHeader = Object.entries(params).length !== 0 && params.constructor === Object

    return (
      <div className={classNames(base, className, {
        [`${base}--stretch`]: stretch,
      })}>
        {header && (
          <LangContext.Consumer>
            {({ getActual }) => (
              <div className={classNames(`${base}__header`, {
                [`${base}__header--minify`]: minifyHeader,
              })}>
                {getActual && typeof header !== 'string' && getActual<withLanguage>(header)}
                {typeof header === 'string' && header}
                {!unfollow && <Link to={''} className={`${base}__subtitle`}>{getActual && getActual<withLanguage>(terms.FOLLOW)}</Link>}
                {before && <div className={`${base}__before`}>{before}</div>}
              </div>
            )}
          </LangContext.Consumer>
        )}
        <div className={classNames(`${base}__in`, {
          [`${base}--media-reverse`]: rotateOnMedia,
        })}>
          <div className={classNames(`${base}__content`, {
            [`${base}__content--full`]: !side
          })}>
            {children}
          </div>
          {side && (
            <div className={`${base}__side`}>
              {side}
            </div>
          )}
        </div>
        {after && (
          <div className={`${base}__after`}>
            {after}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Section)
