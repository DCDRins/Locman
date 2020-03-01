
import React, { Component } from 'react';
import Section from '../../.ui/Section';
import ScrolledContent from '../../.ui/ScrolledContent';
import Group from '../../.ui/Group';
import SimpleBlock, { SimpleBlockList } from '../../.ui/.office/SimpleBlock';
import * as actions from '../../../actions';
import { Event } from '../../../models/event';
import { EventBaseState } from '../../../reducers/event-reducer';
import { ReactComponent as Ico } from '../../../assets/icons/add.svg';
import Icon from '../../.ui/Icon';
import Preloader from '../../.ui/Preloader';
import getHashCode from '../../../lib/getHashCode';
import Button from '../../.ui/Button';
import cuid from 'cuid';

export interface DispatchedUserViewProps {
  fetchUserEvents: typeof actions.eventActions.fetchUserEventListAsync.request;
  createEvent: typeof actions.eventActions.createEventAsync.request;
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
}
export interface StoredUserViewProps extends EventBaseState { }
export type InjectedUserViewProps = DispatchedUserViewProps
& StoredUserViewProps
& { }

export class EventView extends Component<InjectedUserViewProps, {}> {
  componentDidMount() {
    const { fetchUserEvents, createEvent } = this.props;
    fetchUserEvents({ page: 1, onPage: 20 })
  }

  componentDidUpdate() {
    // const { data } = this.props;
    // console.log(data)
  }

  render() {
    const base = 'Event-View'
    const {
      data: { list },
      isLoading,
      createEvent,
      deleteEvent,
      editEvent,
    } = this.props;
    return (
      <Section className={base}>
        <ScrolledContent className={`${base}__content`} orientation="horizontal" buttonSize="l">
          <Group>
            <Group
              className={`${base}__add`}
              content="center"
              justify="center"
              onClick={() => createEvent({
                id: 12,
                charCode: 'unknown-1',
                name: cuid(),
                location: cuid(),
                description: cuid(),
                startDate: '22-10-20 10:10',
                // requestStartDate: '22.22.22',
                // requestFinishDate: '22.22.22',
                eventDuration: '2',
                wwwLink: 'google.com',
                eventType: 1,
                level: 1,
                format: 1,
                // organization: 1,
                // image?: File,
                participationType: 1,
                // educationProgramm?: number,
                // ageLimit?: number,
                // tags?: number | number[],
              })}
            >
              Создать мероприятие
            </Group>
            <Preloader {...{ isLoading }} />
            <SimpleBlockList
              items={list.reverse()}
              itemRenderer={item => (
                <SimpleBlock
                  key={getHashCode(item.characterCode)}
                  data={Event.deserialize(item)}
                  {...{ deleteEvent }}
                  {...{ editEvent }}
                />
              )}
            />
          </Group>
        </ScrolledContent>
      </Section>
    )
  }
}
