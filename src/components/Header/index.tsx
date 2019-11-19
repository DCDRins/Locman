import React, { Component, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import uid from 'uid';
import { HasChildren } from '../../common/types/props'
import ThemeContext from '../../common/context/theme/theme.context'
import LangContext from '../../common/context/lang/lang.context'
import routes, { RouteDictionary, Route } from '../../common/routes'
import Group from '../.ui/Group'
import Button from '../.ui/Button'
import Div from '../.ui/Div'
import Icon from '../.ui/Icon'
import lang, { Lang, withLanguage } from '../../common/lang'
import terms from '../../common/terms'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
// import { ReactComponent as Logo } from '../../assets/icons/Logo.svg'
import getHashCode from '../../lib/getHashCode';

// Header state type
type State = typeof initialState & {}
// Header properties types
type Props = typeof defaultProps & HasChildren & RouteComponentProps<PathParamsType> & {
  userData?: any // userData interface must be here
}
type PathParamsType = {
  location: string,
}
const initialState = Object.freeze({
  transparency: true,
})
const defaultProps = Object.freeze({
  isLoading: true,
})

class Header extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = initialState

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scroll = window.scrollY
    if (scroll > 0) this.setState({ transparency: false });
    else if (scroll === 0) this.setState({ transparency: true });
  }

  setHeaderLinks = (_routes: RouteDictionary = routes, { location: { pathname } } = this.props): JSX.Element => (
    <LangContext.Consumer>
      {({ getActual }) => ( // get actual language terms
        <Group className="Header__links">
          {Object.values(_routes)
          .filter((route: Route) => route.visibleInHeader)
          .map((route: Route) => (
            pathname === route.absolutePath ? (
              <Button key={getHashCode(route.absolutePath)} className="Header__button" permanent level="outline" size="s" {...{ route }}>
                {getActual && getActual<Route>(route)}
              </Button>
            ) : (
              <Button key={getHashCode(route.absolutePath)} className="Header__button" permanent level="simple" size="s" {...{ route }}>
                {getActual && getActual<Route>(route)}
              </Button>
            )
          ))}
          <Button permanent level="simple" size="s" before={<Icon svg={SearchIcon} />}>
            {getActual && getActual<withLanguage>(terms.STOCK_SEARCH)}
          </Button>
        </Group>
      )}
    </LangContext.Consumer>
  )

  render() {
    const { setHeaderLinks } = this
    const { children } = this.props
    const { transparency } = this.state

    return (
      <section className="Header">
        <Group className={`Header__nav ${transparency ? 'Header__nav--transparency' : ''}`} content="center">
          <Div>Logo</Div>
          <Div>{setHeaderLinks()}</Div>
          <Div><img src="user" alt="user" className="Header__user" /></Div>
        </Group>
        {children}
      </section>
    )
  }
}

export default withRouter(Header);