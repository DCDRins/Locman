import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import LangContext from '../../common/context/lang/lang.context'
import { appRoutes, RouteDictionary, Route, officeAppRoutes } from '../../common/dictionaries/routes'
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
import Input from '../.ui/Input'
import classNames from '../../lib/classNames'
import useLocation from '../../lib/useLocation'
import isSatisfied from '../../lib/isSatisfied'
import roles from '../../common/dictionaries/roles'
import Image from '../.ui/Image'
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import * as actions from '../../actions'
import { UserBaseState } from '../../reducers/client-reducer'
import Preloader from '../.ui/Preloader'
import historyService from '../../services/history-service'
import history from '../../services'
import { IContext, IContextMenu } from '../../models/system'

export interface StoredHeaderProps {
  user: UserBaseState;
}
export interface DispatchedHeaderProps {
  fetchUserData: typeof actions.clientActions.fetchUserData.request;
  logout: typeof actions.clientActions.logout;
  openContext: typeof actions.systemActions.openContext;
}
// Props
type InjectedProps = typeof defaultProps & StoredHeaderProps & DispatchedHeaderProps & HasRouterProps
const defaultProps = Object.freeze({ })
// State
type State = typeof initialState
const initialState = Object.freeze({
  isTransparent: true,
  searchOpened: false,
})

class Header extends Component<InjectedProps, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = initialState

  search: React.RefObject<HTMLInputElement> = React.createRef()
  contextMenu: IContextMenu = [{
      icon: {
        svg: LogoMinIcon,
      },
      term: terms.PERSONAL_OFFICE,
      onClick: () => history.push(appRoutes.OFFICE_PAGE.absolutePath),
    }, {
      icon: {
        svg: Logout,
        noStroke: true,
      },
      term: terms.LOGOUT,
      onClick: this.props.logout,
    },
  ];

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
    const { hideFinder } = this
    const { keyCode: key } = e
    if(key === 27) {
      hideFinder();
    }
  }

  openFinder = () => {
    this.setState({ searchOpened: true })
    document.addEventListener('click', this._handleOutsideClick)
  }

  hideFinder = () => {
    this.setState({ searchOpened: false })
    document.removeEventListener('click', this._handleOutsideClick, false)
  }

  _handleOutsideClick = e => ((this.search.current && !this.search.current.contains(e.target)) || this.search.current !== e.target) && this.hideFinder()

  setHeaderLinks = (
    _routes: RouteDictionary = appRoutes,
    { location: { pathname } } = this.props,
    { openFinder } = this,
    { searchOpened } = this.state): JSX.Element => (
    <LangContext.Consumer>
      {({ getActual }) => (
        <Group className="Header__links" content="center" justify="center" stretched>
          {Object.values(_routes).filter((route: Route) => route.visibleInHeader).map((route: Route) => (
            <Div both key={route.absolutePath}>
              <Button
                key={route.absolutePath}
                className={classNames("Header__button", {
                  'active': pathname.split('/')[1] === route.absolutePath.split('/').join(''),
                })}
                level="simple"
                size="s"
                angular
                allowMedia
                {...{ route }}
              >
                {getActual && getActual<Route>(route)}
              </Button>
            </Div>
          ))}
          <Div both>
            <Button
              className={classNames("Header__button", {
                'active': searchOpened,
              })}
              level="simple"
              size="s"
              before={<Icon svg={SearchIcon} />}
              allowMedia
              showIcon
              angular
              onClick={openFinder}
            >
              {getActual && getActual<withLanguage>(terms.STOCK_SEARCH)}
            </Button>
          </Div>
          {searchOpened && (
            <Input
              className="Header__search"
              autoFocus
              getRef={this.search}
              placeholder={getActual && getActual<withLanguage>(terms.FIND)}
              after={
                <Button
                  level="simple"
                  before={<Icon svg={SearchIcon} size={15} />}
                  angular
                />
              }
            />
          )}
        </Group>
      )}
    </LangContext.Consumer>
  )

  render() {
    const { setHeaderLinks } = this;
    const {
      location: { pathname },
      user: {
        data: userData,
        isLoading: isUserLoading,
      },
      openContext,
    } = this.props;
    const {
      name,
      image,
      email,
    } = { ...userData }
    const { searchOpened, isTransparent } = this.state;
    const isOnOfficePage = useLocation(pathname, appRoutes.OFFICE_PAGE.absolutePath);
    const base = "Header"
    return (
      <section className={classNames(base, {
        'office': isOnOfficePage,
        'transparent': isTransparent,
      })}>
        <LangContext.Consumer>
          {({ getActual }) => getActual && (
            <Group content="center" justify="space-between" stretched>
              <Div both className={`${base}__logo-wrapper`}>
                <Link to={appRoutes.MAIN_PAGE.absolutePath}>
                  <Icon svg={LogoIcon} size={100} className={`${base}__logo`} />
                  {/* <Icon svg={!isOnOfficePage ? LogoIcon : LogoDarkIcon} size={100} className={`${base}__logo`} /> */}
                  <Icon svg={LogoMinIcon} size={25} className={`${base}__logo ${base}__logo--min`} />
                </Link>
              </Div>
              {setHeaderLinks()}
              {!isSatisfied(roles.GUEST) && (
                <Div both>
                  <Group content="center" justify="end">
                    <Image
                      src={image && image.path}
                      height={25}
                      width={25}
                      rounded
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        const boundings = e.currentTarget.getBoundingClientRect();
                        userData && openContext({
                          fields: this.contextMenu,
                          user: userData,
                          meta: {
                            boundings,
                          }
                        })
                      }}
                    >
                      <Group content="center" justify="center" stretched>
                        <Preloader isLoading={isUserLoading} size={25} />
                        {!image && (
                            name
                            ? name.charAt(0)
                            : email && email.charAt(0)
                          )
                        }
                      </Group>
                    </Image>
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
                      before={!searchOpened && <Icon svg={SignInIcon} />}
                      onClick={() => historyService.push(officeAppRoutes.OFFICE_AUTH_PAGE.absolutePath)}
                    >
                      {getActual<withLanguage>(terms.SIGN_IN)}
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
