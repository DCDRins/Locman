
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import ScrolledContent from '../../../.ui/ScrolledContent';
import Group from '../../../.ui/Group';
import EventTile from '../../EventTile';
import MinifiedEventTile from '../../MinifiedEventTile';
import * as actions from '../../../../actions';
import { Event } from '../../../../models/event';
import { ManagedEventListBaseState } from '../../../../reducers/event-reducer';
import { ReactComponent as Ico } from '../../../../assets/icons/add.svg';
import Icon from '../../../.ui/Icon';
import Preloader from '../../../.ui/Preloader';
import getHashCode from '../../../../lib/getHashCode';
import Button from '../../../.ui/Button';
import Div from '../../../.ui/Div';
import Field from '../../../.ui/.office/Field';
import { StoredEventTileProps, DispatchedEventTileProps } from '../../EventTile';
import classNames from '../../../../lib/classNames';
import { previewItemsCount } from '../../../../common/constants';

export interface DispatchedEventViewProps extends DispatchedEventTileProps {
  fetchUserEvents: typeof actions.eventActions.fetchManagedEventListAsync.request;
  createEvent: typeof actions.eventActions.createEventAsync.request;
}
export interface StoredEventViewProps extends StoredEventTileProps {
  eventList: ManagedEventListBaseState;
}
export type InjectedEventViewProps = DispatchedEventViewProps
& StoredEventViewProps
& { }

export type State = typeof initialState
const initialState = Object.freeze({ })

export class EventView extends Component<InjectedEventViewProps, State> {
  readonly state: State = initialState

  componentDidMount() {
    const {
      fetchUserEvents,
      fetchTagList,
      fetchEventFormatList,
      fetchEventLevelList,
    } = this.props;
    fetchUserEvents({ page: 1, onPage: previewItemsCount })
    fetchTagList({ })
    fetchEventFormatList({ })
    fetchEventLevelList({ })
  }

  render() {
    const base = 'Event-View'
    const {
      eventList: {
        data,
        isLoading,
      },
      catalog,
      createEvent,
      deleteEvent,
      editEvent,
      fetchTagList,
      uploadImage,
      uploadImageRange,
      fetchEventFormatList,
      fetchEventLevelList,
      deleteImageFromRange,
    } = this.props;
    const { list: eventList } =  { ...data };
    // const { started } = this.state;
    const {
      event: {
        formatList,
        levelList,
      }
    } = { ...catalog }
    return (
      <Section className={base}>
        <Div>
          <Group stretched="x" content="center" justify="start">
            <Button
              level="office-tertiary"
              angular
              onClick={() => {
                const level = levelList.data.shift();
                const format = formatList.data.shift();
                level && format && createEvent(Event.deserialize(Event.new(level, format)).serialize())
              }}
              before={<Icon noStroke svg={Ico} />}
              disabled={formatList.isLoading || levelList.isLoading}
            >
              Добавить мероприятие
            </Button>
            <Preloader {...{ isLoading }} size={30} />
          </Group>
        </Div>
        {!eventList && !isLoading && (
          <Div className={`${base}__isEmpty-string`}>
            Вы пока не добавили ни одного мероприятия
          </Div>
        )}
        {eventList && (
          <ScrolledContent
            orientation="horizontal"
            buttonProps={{ size: 'xl' }}
            className={`${base}__group`}
            isContentLoading={isLoading}
            stretched
          >
            {eventList.map(item => (
              <EventTile
                key={item.characterCode}
                data={Event.deserialize(item)}
                {...{ deleteEvent }}
                {...{ editEvent }}
                {...{ fetchTagList }}
                {...{ uploadImage }}
                {...{ uploadImageRange }}
                {...{ fetchEventFormatList }}
                {...{ fetchEventLevelList }}
                {...{ deleteImageFromRange }}
                {...{ catalog }}
              />
            ))}
          </ScrolledContent>
        )}
        {eventList && (
          <ScrolledContent orientation="vertical" className={`${base}__list`}>
            {eventList.map(item => (
              <MinifiedEventTile
                key={item.characterCode}
                data={Event.deserialize(item)}
                {...{ deleteEvent }}
                {...{ editEvent }}
              />
            ))}
          </ScrolledContent>
        )}
      </Section>
    )
  }
}
