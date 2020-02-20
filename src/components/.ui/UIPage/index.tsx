import React, { ReactElement } from 'react'
import { withRouter } from 'react-router-dom'
import { HasChildren, HasRouterProps } from '../../../common/types/props'
import Header from '../../Header'
import NavigationBar from '../../.personal/NavigationBar'
import classNames from '../../../lib/classNames'
import routes from '../../../common/routes'
import Group from '../Group'
import Section from '../Section'
import { useLocation } from '../../../lib/useLocation'
import Tester from '../../../connected/request-tester-connected'

type Props =
& HasChildren
& HasRouterProps
& { }

const defaultProps = Object.freeze({ })

// type State = typeof initialState
// const initialState = Object.freeze({
//   scrollTop: 0
// })

class UIPage extends React.Component<Props, {}> {
  static readonly defaultProps: Props = defaultProps
  // readonly state: State = initialState

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    
    const { children, location: { pathname } } = this.props
    const isOnPersonalPage = useLocation(pathname, routes.PERSONAL_PAGE.absolutePath)
    const base = 'page'
    // if (params) console.log(params)
    // console.log(this.props);
    const mappedChildren = React.Children.map(children, child => 
      React.cloneElement(child as ReactElement, {
        // globals available in children
      }
    ))
    return (
      <main className={classNames(base, {
        [`${base}--personal`]: isOnPersonalPage,
      })}>
        {/* <FixedLayout /> */}
        <Tester />
        <Header {...{ isOnPersonalPage }} />
        {mappedChildren}
      </main>
    )
  }
}

export default withRouter(UIPage)