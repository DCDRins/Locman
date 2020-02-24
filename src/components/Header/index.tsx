//  TODO LIST:
//  Move header nav bar and stock layout
//  To new component -> Fixed layout

import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { HasRouterProps } from '../../common/types/props'
import LangContext from '../../common/context/lang/lang.context'
import { appRoutes, RouteDictionary, Route } from '../../common/routes'
import Group from '../.ui/Group'
import Button from '../.ui/Button'
import Div from '../.ui/Div'
import Icon from '../.ui/Icon'
import { withLanguage } from '../../common/lang'
import terms from '../../common/terms'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as SignInIcon } from '../../assets/icons/signin.svg'
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg'
// import { ReactComponent as LogoDarkIcon } from '../../assets/icons/logo-dark.svg'
import { ReactComponent as LogoMinIcon } from '../../assets/icons/logo-min.svg'
import getHashCode from '../../lib/getHashCode';
import UserContext from '../../common/context/user/user.context'
import Stock from '../Stock'
import Input from '../.ui/Input'
import classNames from '../../lib/classNames'
import { useLocation } from '../../lib/useLocation'

// Header state type
type State = typeof initialState & { }
// Header properties types
type Props = typeof defaultProps
  & HasRouterProps
  & { }
const initialState = Object.freeze({
  isTransparent: true,
  stockOpened: false,
})
const defaultProps = Object.freeze({
  isLoading: true,
})

class Header extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = initialState

  componentDidMount() {
    const { _handleKeyDown, _handleScroll } = this
    document.addEventListener('keydown', _handleKeyDown);
    document.addEventListener('scroll', _handleScroll);
  }

  componentWillUnmount() {
    const { _handleKeyDown, _handleScroll } = this
    document.removeEventListener('keydown', _handleKeyDown);
    document.removeEventListener('scroll', _handleScroll);
  }

  _handleScroll = () => {
    const { scrollY: scrollTop } = window
    this.setState({ isTransparent: scrollTop <= 0 });
  }

  _handleKeyDown = (e: KeyboardEvent) => {
    const { hideStock } = this
    const { keyCode: key } = e
    if(key === 27) {
      hideStock();
    }
  }

  openStock = () => this.setState({ stockOpened: true })

  hideStock = () => this.setState({ stockOpened: false })

  setHeaderLinks = (
    _routes: RouteDictionary = appRoutes,
    { location: { pathname } } = this.props,
    { hideStock, openStock } = this,
    { stockOpened } = this.state): JSX.Element => (
    <LangContext.Consumer>
      {({ getActual }) => ( // get actual language terms
        <Group className="Header__links">
          {Object.values(_routes)
          .filter((route: Route) => route.visibleInHeader)
          .map((route: Route) => (
            pathname.split('/')[1] === route.absolutePath.split('/').join('') ? (
              <Button
                key={getHashCode(route.absolutePath)}
                className="Header__button"
                level="primary"
                size="s"
                allowMedia
                {...{ route }}
              >
                {getActual && getActual<Route>(route)}
              </Button>
            ) : (
              <Button 
                key={getHashCode(route.absolutePath)}
                className="Header__button"
                level="simple"
                size="s"
                allowMedia
                {...{ route }}
              >
                {getActual && getActual<Route>(route)}
              </Button>
            )
          ))}
          <Button
            level={stockOpened ? 'primary' : 'simple'}
            size="s"
            before={<Icon svg={SearchIcon} />}
            allowMedia
            showIcon
            onClick={stockOpened ? hideStock : openStock}
          >
            {getActual && getActual<withLanguage>(terms.STOCK_SEARCH)}
          </Button>
        </Group>
      )}
    </LangContext.Consumer>
  )

  render() {
    const { setHeaderLinks, hideStock, openStock } = this;
    const { location: { pathname } } = this.props;
    const { stockOpened, isTransparent } = this.state;
    const isOnPersonalPage = useLocation(pathname, appRoutes.PERSONAL_PAGE.absolutePath);
    const base = "Header"
    return (
      <section className={base}>
        <Stock hidden={!stockOpened} />
        <LangContext.Consumer>
          {({ getActual }) => getActual && (
            <Group content="center" className={classNames(`${base}__nav`, {
              [`${base}__nav--personal`]: isOnPersonalPage,
              [`${base}__nav--hidden`]: isTransparent,
            })}
            >
              <Div both>
                <Link to={appRoutes.MAIN_PAGE.absolutePath}>
                  <Icon svg={LogoIcon} size={100} className={`${base}__logo`} />
                  {/* <Icon svg={!isOnPersonalPage ? LogoIcon : LogoDarkIcon} size={100} className={`${base}__logo`} /> */}
                  <Icon svg={LogoMinIcon} size={25} className={`${base}__logo ${base}__logo--min`} />
                </Link>
              </Div>
              <Div>
                {isOnPersonalPage
                  ? <Input
                      placeholder={getActual(terms.FIND)}
                      design="light"
                      button={
                        <Button
                        level="tertiary"
                        before={<Icon svg={SearchIcon} size="m" />}
                        angular
                      />
                      }
                    />
                  : setHeaderLinks()
                }
              </Div>
              <UserContext.Consumer>
                {({ authenticated }) => (
                  authenticated ? (
                    <Div both>
                      <img src="user" alt="user" className={`${base}__user`} />
                      {/* <Context /> */}
                    </Div>
                  ) : (
                    getActual && (
                      <Div both>
                        <Button
                          className={`${base}__sign-in`}
                          level="tertiary"
                          size="s"
                          angular
                          allowMedia
                          showIcon
                          before={!stockOpened ? <Icon svg={SignInIcon} /> : getActual(terms.BACK)}
                          onClick={stockOpened ? hideStock : openStock}
                        >
                          {getActual<withLanguage>((stockOpened ? terms.BACK : terms.SIGN_IN))}
                        </Button>
                      </Div>
                    )
                  )
                )}
              </UserContext.Consumer>
            </Group>
          )}
        </LangContext.Consumer>
      </section>
    )
  }
}

export default withRouter(Header);
