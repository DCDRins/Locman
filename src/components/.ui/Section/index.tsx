import React, { Component, HTMLAttributes, ComponentType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HasChildren } from '../../../common/types/props'
import LangContext from '../../../common/context/lang/lang.context'
import { withLanguage } from '../../../common/lang'
import terms from '../../../common/terms'
import Div from '../Div'
import classNames from '../../../lib/classNames'

type Props = HasChildren & HTMLAttributes<HTMLElement> & typeof defaultProps & {
  header?: withLanguage;
  side?: ReactNode;
  after?: ReactNode;
}
const defaultProps = Object.freeze({
  rotateOnMedia: true,
})

export default class Section extends Component<Props, {}> {
  static readonly defaultProps = defaultProps

  render() {
    const { header, className, children, side, after, rotateOnMedia } = this.props
    const base = 'Section'
    return (
      <Div className={classNames(base, className!)}>
        {header && (
          <LangContext.Consumer>
            {({ getActual }) => (
              <div className={`${base}__header`}>
                {getActual && getActual<withLanguage>(header)}
                <Link to={''} className={`${base}__subtitle`}>{getActual && getActual<withLanguage>(terms.FOLLOW)}</Link>
              </div>
            )}
          </LangContext.Consumer>
        )}
        <div className={classNames(`${base}__in`, {
          [`${base}__in--media-column`]: rotateOnMedia,
        })}>
          <div className={`${base}__content`}>
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
      </Div>
    )
  }
}
