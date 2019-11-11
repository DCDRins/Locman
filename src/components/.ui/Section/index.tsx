import React, { Component, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { HasChildren } from '../../../common/types/props'
import LangContext from '../../../common/context/lang/lang.context'
import { withLanguage } from '../../../common/lang'
import terms from '../../../common/terms'
import Div from '../Div'
import classNames from '../../../lib/classNames'

type State = typeof initialState & {}
type Props = HasChildren & HTMLAttributes<HTMLElement> & {
  header: withLanguage;
}
const initialState = Object.freeze({
})

export default class Section extends Component<Props, State> {
  readonly state: State = initialState

  render() {
    const { header, className, children } = this.props
    const base = 'Section'
    return (
      <section className={classNames(base, className!)}>
        <Div>
          {header && (
            <LangContext.Consumer>
              {({ getActual }) => (
                <div className={`${base}__header`}>
                  {getActual && getActual<withLanguage>(header)}
                  {/* Here must be a route term */}
                  <Link to={''} className={`${base}__subtitle`}>{getActual && getActual<withLanguage>(terms.FOLLOW)}</Link>
                </div>
              )}
            </LangContext.Consumer>
          )}
          <div className={`${base}__content`}>
            {children}
          </div>
        </Div>
      </section>
    )
  }
}
