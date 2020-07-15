import React, { Component } from 'react';
import Section from '../.ui/Section';
import { ReactComponent as FlashIcon } from '../../assets/icons/flash.svg'
import * as actions from '../../actions';
import { CurrentRouteBaseState } from '../../reducers/route-reducer';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import Div from '../.ui/Div';
import Icon from '../.ui/Icon';
import Button from '../.ui/Button';
import classNames from '../../lib/classNames';
import Image from '../.ui/Image';
import moment from 'moment';
import 'moment/locale/ru';
import Group from '../.ui/Group';
import Context from '../.ui/Context';
import terms from '../../common/dictionaries/terms';

export interface DispatchedCurrentRouteProps {
  fetchCurrentRoute: typeof actions.routeActions.fetchCurrentRoute.request,
}
export interface StoredCurrentRouteProps {
  currentRoute: CurrentRouteBaseState;
}
type InjectedProps = typeof defaultProps
& DispatchedCurrentRouteProps
& StoredCurrentRouteProps
& { }
const defaultProps = Object.freeze({
  timeDuration: 5000,
})
type State = typeof initialState & { }
const initialState = Object.freeze({
  currentId: 0,
})

export default class CurrentRoute extends Component<InjectedProps, State> {
  readonly state: State = initialState
  static readonly defaultProps = defaultProps
  componentDidMount() {
    const { fetchCurrentRoute } = this.props
    fetchCurrentRoute({ });
    this.startInterval()
  }

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentWillUnmount() {
    const { _intervalId } = this
    this._isMounted = false
    if (_intervalId) clearInterval(_intervalId)
  }

  startInterval = () => {
    const { timeDuration } = this.props
    this._intervalId = setInterval(() => {
      this.next()
    }, timeDuration)
  }

  next = () => {
    const {
      currentRoute: {
        data,
      },
    } = this.props;
    const { events } = { ...data };
    const { currentId } = this.state
    events && this._isMounted && this.setState({ currentId: (currentId + 1) % events.length });
  }

  handleClick = () => {
    if (this._intervalId)
      clearInterval(this._intervalId)
    this.next()
    this.startInterval()
  }

  render () {
    const base = 'Current-Route';
    const {
      currentRoute: {
        data,
      },
    } = this.props;
    if (!data) return null;
    
    const { name, description, tags, events, startDate, allParticipants } = data;
    const { currentId } = this.state;
    return data && (     
      <Section
        className={`${base}`}
        side={
          <div className={`${base}__in`}>
            {events && events.map(({ id, image, name, startDate }, idx) => (
              <Image
                onClick={this.handleClick}
                key={id}
                src={image && image.path}
                className={classNames(`${base}__in-image`, {
                  [`${`${base}__in-image--active`}`]: idx === currentId,
                  [`${`${base}__in-image--passed`}`]: idx < currentId,
                })}
              >
                <Group orientation="vertical" justify="space-between" stretched content="center" className={`${base}__in-text-content`}>
                  <div className={`${base}__in-title`}>{name}</div>
                  <div className={`${base}__in-description`}>{moment(startDate, 'HH:mm:ss DD.MM.YYYY').format('LLLL')}</div>
                </Group>
              </Image>
            ))}
          </div>
        }
      >
        <div className="header-1">{name}</div>
        <Div>
          <Group justify="start">
            <Button before={<Icon svg={FlashIcon} />} className={`${base}__custom-tag`} level="tag" size="s" angular style={{ marginRight: '10px'}}>
              Текущий маршрут
            </Button>
            {tags.map((_, idx) => (
              <Button key={idx} level="tag" size="s" angular style={{ marginRight: '10px'}}>
                Новый маршрут
              </Button>
            ))}
          </Group>
        </Div>
        <div className={`${base}__group`}>
          <Div both data-attr="Дата проведения">
            {moment(startDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY')}
          </Div>
          <Div both data-attr="Количество участников">
            {allParticipants}
          </Div>
        </div>
        {description && <Div className={`${base}__description`}>{description}</Div>}
      </Section>
    )
  }
}
