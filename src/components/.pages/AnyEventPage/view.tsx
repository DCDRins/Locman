import React from 'react'
import Ground from '../../.ui/Ground'
import ClosestEvent from '../../ClosestEvent'
import UIPage from '../../.ui/UIPage'
import StockContentViewer from '../../StockContentViewer'
import Section from '../../.ui/Section'
import ScrolledContent from '../../.ui/ScrolledContent'
import * as actions from '../../../actions'
import { CurrentEventBaseState } from '../../../reducers/event-reducer'
import { HasRouterProps } from '../../../.types/props'
import Img from '../../../assets/images/museum-flat-wallpaper-1.jpg'
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg'
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg'
import { ReactComponent as DisagreeIcon } from '../../../assets/icons/disagree.svg'
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';
import { ReactComponent as InfiniteIcon } from '../../../assets/icons/infinite.svg';
import Group from '../../.ui/Group'
import Button from '../../.ui/Button'
import Icon from '../../.ui/Icon'
import { IEventDTO } from '../../../models'
import Museum from '../../.ui/Museum'
import Image from '../../.ui/Image'
import classNames from '../../../lib/classNames'
import moment from 'moment'
import 'moment/locale/ru'
import Div from '../../.ui/Div'

export interface DispatchedAnyEventPageProps {
  fetchEvent: typeof actions.eventActions.fetchEventAsync.request;
}
export interface StoredAnyEventPageProps {
  event: CurrentEventBaseState;
}
type OwnProps = HasRouterProps & { }
export interface InjectedAnyEventPageProps extends DispatchedAnyEventPageProps, StoredAnyEventPageProps, OwnProps { }

type State = typeof initialState & { }
const initialState = Object.freeze({
  isVisibleDescription: false,
})

export default class AnyEventPage extends React.Component<InjectedAnyEventPageProps, State> {
  readonly state: State = initialState
  componentDidMount() {
    const {
      match: { params: { id } },
      fetchEvent,
    } = this.props
    fetchEvent(id);
  }

  toggleDesc = () => this.setState(({ isVisibleDescription }) => ({ isVisibleDescription: !isVisibleDescription }))

  render() {
    const base = "Any-Event-Page"
    const { isVisibleDescription } = this.state
    const {
      event: {
        data,
      },
    } = this.props
    const {
      characterCode,
      name,
      description,
      images,
      image,
      organization,
      status,
      startDate,
      finishDate,
      needApprove,
      requestStartDate,
      requestFinishDate,
    } = { ...data } as IEventDTO
    return (
      <UIPage className={base}>
        <Ground stretch limit src={image && image.path} layout="bottom">
          {data && (
            <Section>
              {status === "Подтверждено" && (
                <Button
                  className={`${base}__status`}
                  showIcon
                  size="s"
                  level="tag"
                  angular
                  before={<Icon svg={SuccessIcon} size={20} />}
                >
                  {status}
                </Button>
              )}
              <div className={`${base}__title`}>
                {name}
              </div>
              <Div className={`${base}__date`}>
                {moment(startDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')} — 
                {finishDate
                  ? moment(finishDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')
                  : <Icon svg={InfiniteIcon} size={50} />
                }
                {/* {needApprove && (
                  <div>
                    Прием заявок: {moment(requestStartDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')} — 
                    {finishDate
                      ? moment(requestFinishDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')
                      : <Icon svg={InfiniteIcon} size={30} />
                    }
                  </div>
                )} */}
              </Div>
              <Group justify="start" className={`${base}__buttons`}>
                <Button
                  showIcon
                  allowMedia
                  before={<Icon svg={AddIcon} />}
                  level="primary"
                  angular
                >
                  Добавить в маршрут
                </Button>
                <Button
                  showIcon
                  allowMedia
                  before={<Icon svg={DisagreeIcon} />}
                  level="alert"
                  angular
                >
                  Удалить из всех маршрутов
                </Button>
              </Group>
            </Section>
          )}
        </Ground>
        {/* {data && (
          <Section>
            <Div className={`${base}__date`}>
              {moment(startDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')} — 
              {finishDate
                ? moment(finishDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')
                : <Icon svg={InfiniteIcon} size={40} />
              }
              {needApprove && (
                <div className={`${base}__date`}>
                  Прием заявок: {moment(requestStartDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')} — 
                  {finishDate
                    ? moment(requestFinishDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')
                    : <Icon svg={InfiniteIcon} size={40} />
                  }
                </div>
              )}
            </Div>
          </Section>
        )} */}
        <Section
          header="Описание"
          unfollow
          className={`${base}__description`}
        >
          <div className={classNames(`${base}__description__text`, {
              'isVisible': isVisibleDescription,
            })}
          >
            {description && description}
            {description && <br />}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, explicabo placeat quo veniam exercitationem architecto minima esse vitae officiis quam expedita necessitatibus porro dolor rerum voluptas magnam laudantium unde. Voluptates!
          </div>
          <Button
            className={classNames({ 'rotated': isVisibleDescription })}
            stretched="x"
            angular
            align="center"
            level="tertiary"
            before={<Icon svg={DownIcon} noFill />}
            onClick={this.toggleDesc}
          />
        </Section>
        {images && images.length > 0 && (
          <Section>
            <ScrolledContent orientation="horizontal">
              {images.map(({ path, id }) => (
                <Image
                  key={id}
                  src={path}
                  height={150}
                  keepAspectRatio
                />
              ))}
            </ScrolledContent>
          </Section>
        )}
        {organization && (
          <Section>
            <Museum
              stretched
              data={{
                ...organization,
                image: {
                  path: Img,
                  id: 1,
                }
              }}
            />
          </Section>
        )}
      </UIPage>
    )
  }
}
