import React from 'react'
import Ground from '../../.ui/Ground'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import ScrolledContent from '../../.ui/ScrolledContent'
import * as actions from '../../../actions'
import { CurrentEventBaseState } from '../../../reducers/event-reducer'
import { HasRouterProps } from '../../../.types/props'
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg'
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg'
import { ReactComponent as DisagreeIcon } from '../../../assets/icons/disagree.svg'
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';
import { ReactComponent as InfiniteIcon } from '../../../assets/icons/infinite.svg';
import Group from '../../.ui/Group'
import Button from '../../.ui/Button'
import Icon from '../../.ui/Icon'
import { IEventDTO, Route } from '../../../models'
import Museum from '../../.ui/Museum'
import Image from '../../.ui/Image'
import classNames from '../../../lib/classNames'
import moment from 'moment'
import 'moment/locale/ru'
import Div from '../../.ui/Div'
import Field from '../../.ui/.office/Field'
import GMap from '../../.ui/GMap'
import isSatisfied from '../../../lib/isSatisfied'
import roles from '../../../common/dictionaries/roles'
import { initialUserRouteListState } from '../../../reducers/route-reducer'

export interface DispatchedAnyEventPageProps {
  fetchEvent: typeof actions.eventActions.fetchEventAsync.request;
  createRoute: typeof actions.routeActions.createRoute.request;
  openModal: typeof actions.systemActions.openModal;
  closeModal: typeof actions.systemActions.closeModal;
}
export interface StoredAnyEventPageProps {
  event: CurrentEventBaseState;
}
type OwnProps = HasRouterProps & {}
export interface InjectedAnyEventPageProps extends DispatchedAnyEventPageProps, StoredAnyEventPageProps, OwnProps { }

type State = typeof initialState & {}
const initialState = Object.freeze({})

export default class AnyEventPage extends React.Component<InjectedAnyEventPageProps, State> {
  readonly state: State = initialState
  componentDidMount() {
    const {
      match: { params: { id } },
      fetchEvent,
    } = this.props
    fetchEvent(id);
  }

  render() {
    const base = "Any-Event-Page"
    const {
      event: {
        data,
      },
      createRoute,
      openModal,
      closeModal,
    } = this.props
    const {
      id,
      characterCode,
      name,
      description,
      images,
      image,
      organization,
      status,
      startDate,
      finishDate,
      eventDuration,
      tags,
      costPerson,
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
              {eventDuration && (
                <Div className={`${base}__duration`}>{`Длительность: ${eventDuration}`}</Div>
              )}
              {isSatisfied([roles.TEACHER, roles.PARTICIPANT, roles.PARENT]) && (
                <Button
                  showIcon
                  allowMedia
                  before={<Icon svg={AddIcon} />}
                  level="primary"
                  angular
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const boundings = e.currentTarget.getBoundingClientRect();
                    openModal({
                      children: (
                        <div className={`${base}__modal`}>
                          <Button
                            stretched="x"
                            angular
                            level="primary"
                            onClick={() => createRoute(Route.new(data).serialize())}
                          >
                            Создать новый
                          </Button>
                        </div>
                      ),
                      meta: {
                        boundings,
                        pinned: true,
                        stretch: true,
                      },
                    })
                  }}
                >
                  Добавить в маршрут
                </Button>
              )}
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
          <Section className={`${base}__description`}>
            {description}
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
        {costPerson && (
          <Section
            header="Стоимость посещения:"
            unfollow
            before={(
              <Div both className={`${base}__cost`}>{costPerson}</Div>
            )}
          />
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
