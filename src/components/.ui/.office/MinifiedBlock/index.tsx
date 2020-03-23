import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru';
import Div from '../../Div';
import Group from '../../Group';
import Image from '../../Image';
import Field from '../Field';
import ScrolledContent from '../../ScrolledContent';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import Button from '../../Button';
import { IEventDTO, Event } from '../../../../models/event';
import GenericList from '../../GenericList';
import Icon from '../../Icon';
import classNames from '../../../../lib/classNames';
import * as actions from '../../../../actions';
import { appRoutes } from '../../../../common/dictionaries/routes';

type Props = {
  data: IEventDTO
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request,
  editEvent: typeof actions.eventActions.editEventAsync.request,
}
export default class SimpleBlock extends Component<Props, {}> {
  render() {
    const base = "Minified-Block"
    const { deleteEvent, editEvent } = this.props
    const {
      data: {
        id,
        characterCode,
        image,
        name,
        startDate,
        finishDate,
        finished,
        location,
        description,
        wwwLink,
        ageLimit,
      },
    } = this.props;
    return (
      // <Div >
        <Link className={base} to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/1`}>
          <Group className={`${base}__group`} content="center" stretched="x" justify="start">
            <Div both>
              <Image src={image} height={20} width={20} rounded />
            </Div>
            <Div both className={`${base}__title`}>
              {name}
            </Div>
            {startDate && (
              <Div both>
                {`Начало: ${startDate}`}
              </Div>
            )}
            {location && (
              <Div both>
                {`Расположение: ${location}`}
              </Div>
            )}
            {description && (
              <Div both>
                {`Описание: ${description.substring(0, 10)}...`}
              </Div>
            )}
            {finishDate && (
              <Div both>
                {`Окончание: ${startDate}`}
              </Div>
            )}
            {wwwLink && (
              <Div both>
                {`Сайт: ${wwwLink}`}
              </Div>
            )}
            {ageLimit && (
              <Div both>
                {`Ограничение по возрасту: ${ageLimit}+`}
              </Div>
            )}
          </Group>
        </Link>
      // </Div>
    )
  };
}

export class MinifiedBlockList extends GenericList<IEventDTO> {}
