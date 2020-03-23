import React, { ReactElement } from 'react'
import { withRouter } from 'react-router-dom'
import { HasChildren, HasRouterProps } from '../../../.types/props'
import Header from '../../Header'
import classNames from '../../../lib/classNames'
import useLocation from '../../../lib/useLocation'
import { appRoutes } from '../../../common/dictionaries/routes'
import Tester from '../../../connected/request-tester-connected'

type Props = HasChildren & HasRouterProps
const defaultProps = Object.freeze({ })

class UIPage extends React.Component<Props, {}> {
  static readonly defaultProps = defaultProps

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {  
    const { children, location: { pathname } } = this.props
    const isOnOfficePage = useLocation(pathname, appRoutes.OFFICE_PAGE.absolutePath)
    const base = 'page'
    return (
      <main className={classNames(base, {
        [`${base}--office`]: isOnOfficePage,
      })}>
        {/* <FixedLayout /> */}
        <Tester />
        <Header {...{ isOnOfficePage }} />
        {children}
      </main>
    )
  }
}

export default withRouter(UIPage)