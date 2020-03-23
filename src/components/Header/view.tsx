import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import LangContext from '../../common/context/lang/lang.context'
import { appRoutes, RouteDictionary, Route } from '../../common/dictionaries/routes'
import { HasRouterProps } from '../../.types/props'
import Group from '../.ui/Group'
import Button from '../.ui/Button'
import Div from '../.ui/Div'
import Icon from '../.ui/Icon'
import { withLanguage } from '../../common/dictionaries/lang'
import terms from '../../common/dictionaries/terms'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as SignInIcon } from '../../assets/icons/signin.svg'
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg'
import { ReactComponent as LogoMinIcon } from '../../assets/icons/logo-min.svg'
import getHashCode from '../../lib/getHashCode';
import Stock from '../Stock'
import Input from '../.ui/Input'
import classNames from '../../lib/classNames'
import useLocation from '../../lib/useLocation'
import isSatisfied from '../../lib/isSatisfied'
import roles from '../../common/dictionaries/roles'
import Image from '../.ui/Image'
import Context from '../.ui/Context'
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import * as actions from '../../actions'
import { UserState } from '../../reducers/client-reducer'
import history from '../../services'
import Preloader from '../.ui/Preloader'

export interface StoredHeaderProps extends UserState { }
export interface DispatchedHeaderProps {
  fetchUserData: typeof actions.clientActions.fetchUserData.request;
  logout: typeof actions.clientActions.logout;
}
// Props
type InjectedProps = typeof defaultProps
& StoredHeaderProps
& DispatchedHeaderProps
& HasRouterProps
const defaultProps = Object.freeze({ })
// State
type State = typeof initialState
const initialState = Object.freeze({
  isTransparent: true,
  stockOpened: false,
})

class Header extends Component<InjectedProps, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = initialState

  componentDidMount() {
    const { _handleKeyDown, _handleScroll } = this
    const { fetchUserData } = this.props;
    document.addEventListener('keydown', _handleKeyDown);
    document.addEventListener('scroll', _handleScroll);
    if (!isSatisfied(roles.GUEST)) {
      fetchUserData({});
    }
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
    const {
      location: { pathname },
      user,
      userError,
      isUserLoading,
      logout,
    } = this.props;
    const {
      name,
      photo,
      email,
    } = { ...user }
    const { stockOpened, isTransparent } = this.state;
    const isOnOfficePage = useLocation(pathname, appRoutes.OFFICE_PAGE.absolutePath);
    const base = "Header"
    return (
      <section className={base}>
        <Stock hidden={!stockOpened} />
        <LangContext.Consumer>
          {({ getActual }) => getActual && (
            <Group content="center" className={classNames(`${base}__nav`, {
              [`${base}__nav--office`]: isOnOfficePage,
              [`${base}__nav--hidden`]: isTransparent,
            })}
            >
              <Div both>
                <Link to={appRoutes.MAIN_PAGE.absolutePath}>
                  <Icon svg={LogoIcon} size={100} className={`${base}__logo`} />
                  {/* <Icon svg={!isOnOfficePage ? LogoIcon : LogoDarkIcon} size={100} className={`${base}__logo`} /> */}
                  <Icon svg={LogoMinIcon} size={25} className={`${base}__logo ${base}__logo--min`} />
                </Link>
              </Div>
              <Div>
                {isOnOfficePage
                  ? <Input
                      placeholder={getActual(terms.FIND)}
                      level="light"
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
              {!isSatisfied(roles.GUEST) && (
                <Div both>
                  <Group content="center" justify="end">
                    <Context
                      header={(
                        <Group justify="start" content="center">
                          <Div both>
                            <Image src={photo} height={30} width={30} rounded>
                              <Preloader isLoading={isUserLoading} size={30} />
                              {!photo && name && name.charAt(0)}
                            </Image>
                          </Div>
                          <Div>
                            <Group
                              justify="start"
                              orientation="vertical"
                              content="start"
                              className={classNames(`${base}__user`, {
                                'loading': isUserLoading,
                              })}
                            >
                              <div>{name && name}</div>
                              <div>{email && email}</div>
                            </Group>
                          </Div>
                        </Group>
                      )}
                      contextButton={(
                        <Image src={photo} height={20} width={20} rounded>
                          <Preloader isLoading={isUserLoading} size={20} />
                          {!photo && name && name.charAt(0)}
                        </Image>
                      )}
                      hidden={false}
                      fields={[{
                          svg: LogoMinIcon,
                          term: terms.PERSONAL_OFFICE,
                          onClick: () => history.push(appRoutes.OFFICE_PAGE.absolutePath),
                        }, {
                          svg: Logout,
                          term: terms.LOGOUT,
                          onClick: logout,
                        },
                      ]}
                    />
                  </Group>
                </Div>
              )}
              {isSatisfied(roles.GUEST) && (
                getActual && (
                  <Div both>
                    <Button
                      className={`${base}__sign-in`}
                      level="tertiary"
                      size="s"
                      angular
                      allowMedia
                      showIcon
                      // before={!stockOpened ? <Icon svg={SignInIcon} /> : getActual(terms.BACK)}
                      before={!stockOpened && <Icon svg={SignInIcon} />}
                      onClick={stockOpened ? hideStock : openStock}
                    >
                      {getActual<withLanguage>((stockOpened ? terms.BACK : terms.SIGN_IN))}
                    </Button>
                  </Div>
                )
              )}
            </Group>
          )}
        </LangContext.Consumer>
      </section>
    )
  }
}

export default withRouter(Header);
