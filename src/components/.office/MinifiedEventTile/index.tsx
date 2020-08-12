import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/ru';
import Div from '../../.ui/Div';
import Group from '../../.ui/Group';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import ScrolledContent from '../../.ui/ScrolledContent';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as ViewIcon } from '../../../assets/icons/view.svg';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import Button from '../../.ui/Button';
import { IEventDTO, Event } from '../../../models/event';
import GenericList from '../../.ui/GenericList';
import Icon from '../../.ui/Icon';
import classNames from '../../../lib/classNames';
import * as actions from '../../../actions';
import { appRoutes } from '../../../common/dictionaries/routes';

type Props = {
  data: IEventDTO
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request,
  // showRequests: typeof actions.eventActions.editEventAsync.request,
}
type State = typeof initialState & { }
const initialState = Object.freeze({
  showRequests: false,
})
export default class MinifiedEventTile extends Component<Props, State> {
  readonly state: State = initialState

  toggleRequests = () => this.setState(({ showRequests }) => ({ showRequests: !showRequests }))

  render() {
    const base = "Minified-Event-Tile"
    const { deleteEvent } = this.props
    const { showRequests } = this.state
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
      },
    } = this.props;
    return (
      <Div both half className={classNames(base, {
          'active': showRequests
        })}
      >
        <Group content="center" stretched="x" justify="space-between">
          <Group className={`${base}__group`} content="center" justify="start">
            <Div both half>
              <Image src={image && image.path} height={20} width={20} rounded />
            </Div>
            <Div both half className={`${base}__title`}>
              {name}
            </Div>
            {location && (
              <Div both half>
                {location}
              </Div>
            )}
            {startDate && (
              <Div both half>
                {moment(startDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')}{finishDate && ` – ${moment(finishDate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')}`}
              </Div>
            )}
          </Group>
          <Button level="office-secondary" before={<Icon svg={EditIcon} noStroke size={12} />} />
          <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/${characterCode}`}>
            <Button level="office-secondary" before={<Icon svg={ViewIcon} noStroke size={12} />} />
          </Link>
          <Button
            level="office-secondary"
            before={<Icon svg={NextIcon} noFill size={12} className={`${base}__rotate-icon`} />}
            onClick={this.toggleRequests}
          />
        </Group>
        <ScrolledContent className={`${base}__requests`}>
          <Group className={`${base}__group`} content="center" justify="start">
            <Div both half className={`${base}__title`}>
              {name}
            </Div>
            <Div both half className={`${base}__title`}>
              {name}
            </Div>
          </Group>
          {/* 2 buttons - yes / no;  */}
        </ScrolledContent>
      </Div>
    )
  };
}

// export class MinifiedEventList extends GenericList<IEventDTO> {}
