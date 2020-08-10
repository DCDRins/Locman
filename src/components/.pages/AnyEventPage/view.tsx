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
import Field from '../../.ui/.office/Field'
import GMap from '../../.ui/GMap'

export interface DispatchedAnyEventPageProps {
  fetchEvent: typeof actions.eventActions.fetchEventAsync.request;
  createRoute: typeof actions.routeActions.createRoute.request;
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
      tags,
      needApprove,
      requestStartDate,
      requestFinishDate,
    } = { ...data } as IEventDTO
    return (
      <UIPage className={base}>
        <Ground stretch mask="dark-left" limit src={image && image.path} layout="bottom">
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
        {tags && (
          <Section header=" " unfollow>
            {tags.map(({ id, name }) => (
              <Button
                key={id}
                className={`${base}__tag`}
                showIcon
                size="s"
                level="tag"
                angular
              >
                {`#${name}`}
              </Button>
            ))}
          </Section>
        )}
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
        {description && (
          <Section
            header="Описание"
            unfollow
            className={`${base}__description`}
          >
            <div className={classNames(`${base}__description__text`, {
                'isVisible': isVisibleDescription,
                'large-text': description.length > 200,
              })}
            >
              {description}
            </div>
            <Button
              className={classNames({
                'rotated': isVisibleDescription,
              })}
              stretched="x"
              angular
              align="center"
              level="tertiary"
              before={<Icon svg={DownIcon} noFill />}
              onClick={this.toggleDesc}
            />
          </Section>
        )}
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
          <Section
            align="align-center"
            key={organization.id}
            header="Организатор"
            side={
             <div className={`${base}__side`}>
               {organization.city && (
                 <Field
                   readonly
                   title="Город"
                   showTitle
                   field={{ city: organization.city.name }}
                 />
               )}
               {organization.category && (
                 <Field
                   readonly
                   title="Категория организации"
                   showTitle
                   field={{ category: organization.category.name }}
                 />
               )}
               {organization.phone && (
                 <Field
                   readonly
                   title="Телефон"
                   showTitle
                   field={{ phone: `${organization.phone}` }}
                 />
               )}
             </div>
           }
           after={organization.latitude && organization.longitude && (
            <Group stretched="x" className={`${base}__map`}>
              <GMap latitude={organization.latitude} longitude={organization.longitude} />
            </Group>
           )}
         >
           <Museum
            data={{
              ...organization,
              organization: organization,
             }}
            />
         </Section>
        )}
      </UIPage>
    )
  }
}
