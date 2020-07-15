import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru';
import Div from '../../.ui/Div';
import Group from '../../.ui/Group';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import ScrolledContent from '../../.ui/ScrolledContent';
import { ReactComponent as FlashIcon } from '../../../assets/icons/flash.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';
import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';
import { ReactComponent as ImageIcon } from '../../../assets/icons/image.svg';
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import Img from '../../../assets/images/museum-flat-wallpaper-7.jpg';
import Button from '../../.ui/Button';
import Icon from '../../.ui/Icon';
import classNames from '../../../lib/classNames';
import * as actions from '../../../actions';
import { IRouteDTO } from '../../../models';
import Section from '../../.ui/Section';
import Ground from '../../.ui/Ground';
import Event from '../../.ui/Event';
import { onPageItemsCount } from '../../../common/constants';
import cuid from 'cuid';
import uid from 'uid';
import ISelect from '../../.ui/ISelect';
import { IContextMenu } from '../../../models/system';
import terms from '../../../common/dictionaries/terms';


export interface DispatchedRouterEditorProps {
  openContext: typeof actions.systemActions.openContext;
  closeContext: typeof actions.systemActions.closeContext;
}
export interface StoredRouterEditorProps { }
export type InjectedRouterEditorProps = DispatchedRouterEditorProps
& StoredRouterEditorProps
& { }

interface InjectedProps extends StoredRouterEditorProps, DispatchedRouterEditorProps {
  // data: IRouteDTO
}
type State = typeof initialState & { }
const initialState = Object.freeze({
  details: false,
})
export default class RouteEditor extends Component<InjectedProps, State> {
  readonly state: State = initialState

  contextMenu: IContextMenu = [
    {
      icon: {
        svg: ShareIcon,
        noStroke: true,
      },
      term: terms.SHARE,
    },
    {
      icon: {
        svg: EditIcon,
        noStroke: true,
      },
      term: terms.EDIT,
      onClick: () => this.setState({ details: true })
    },
    {
      icon: {
        svg: ImageIcon,
      },
      term: terms.CHANGE_IMAGE,
    },
    {
      icon: {
        svg: TrashIcon,
      },
      term: terms.REMOVE,
    },
  ];

  toggleDetails = () => this.setState(({ details }) => ({ details: !details }))

  render() {
    const base = "Route-Editor"
    const { details } = this.state
    const {
      openContext,
      closeContext,
      // data: {
      //   id,
      //   characterCode,
      //   image,
      //   name,
      //   startDate,
      //   finishDate,
      // },
    } = this.props;
    const field = 'Test-value';
    return (
      <Section className={classNames(base, {
        'isOpen': details,
      })}>
        <Ground src={Img} stretch limit layout="bottom" solid minHeight={250}>
          <Group justify="start">
            <Div both half className={`${base}__title`}>Название</Div>
            <Div both className={`${base}__context`}>
              <Button
                before={<Icon svg={MenuIcon} size="m" />}
                level="simple"
                size="s"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  closeContext();
                  openContext({
                    pinned: true,
                    fields: this.contextMenu,
                    meta: {
                      boundings: e.currentTarget.getBoundingClientRect() 
                    },
                  });
                }}
              />
            </Div>
          </Group>
          <Group content="end">
            <Div both>
              <Group justify="start" className={`${base}__tags`}>
                <Button before={<Icon svg={FlashIcon} />} className="custom" level="tag" size="s" angular>
                  Текущий маршрут
                </Button>
                {[...Array(4)].map((_, idx) => (
                  <Button key={idx} before="#" level="tag" size="s" angular>
                    Новый маршрут
                  </Button>
                ))}
              </Group>
            </Div>
            <Button
              level="simple"
              // className="asd"
              angular
              stretched
              before={<Icon svg={DownIcon} noFill size={30} />}
              onClick={this.toggleDetails}
            />
          </Group>
        </Ground>
        {details && (
          <Group className={`${base}__group`} stretched="x" content="stretch" rotateOnMedia>
            <div className={`${base}__edit`}>
              <Field
                title="Название маршрута"
                showTitle
                field={{ field }}
              />
              <Field
                title="Описание"
                showTitle
                field={{ field }}
              />
              <ISelect
                title="Тэги"
                defaultValue={[...Array(2)].map((_, idx) => ({ value: idx, label: field }))}
                isMulti
              />
            </div>
            <Group content="center" className={`${base}__content`}>
              <ScrolledContent orientation="horizontal" minify contentClassName={`${base}__events`}>
                {[...Array(onPageItemsCount)].map((_, idx) => <Event key={idx} name={field} title={field} subtitle={field} image={Img} description={field} minify /> )}
              </ScrolledContent>
            </Group>
            <div className={`${base}__users`}>
              <Button
                level="office-secondary"
                stretched="x"
                angular
              >
                Добавить
              </Button>
              {[...Array(15)].map((_, idx) => (
                <Group key={idx} justify="start" stretched="x" content="center" inline className="user">
                  <Div both half className="user__number">
                    {idx + 1}:
                  </Div>
                  <Div half>
                    <Image src={Img} height={30} width={30} rounded />
                  </Div>
                  <Div both half className="user__name">Евгений Милонов</Div>
                  <Button
                    className="user__discard"
                    level="office-secondary"
                    angular
                    before={<Icon svg={CrossIcon} />}
                  />
                </Group>
              ))}
            </div>
          </Group>
        )}
      </Section>
    )
  };
}
