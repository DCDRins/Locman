
import React, { Component } from 'react';
import Section from '../../.ui/Section';
import ScrolledContent from '../../.ui/ScrolledContent';
import Group from '../../.ui/Group';
import SimpleBlock from '../../.ui/.office/SimpleBlock';
import { SimpleBlockList } from '../../.ui/.office/SimpleBlock/view';
import MinifiedBlock, { MinifiedBlockList } from '../../.ui/.office/MinifiedBlock';
import * as actions from '../../../actions';
import { Event } from '../../../models/event';
import { EventBaseState } from '../../../reducers/event-reducer';
import { ReactComponent as Ico } from '../../../assets/icons/add.svg';
import Icon from '../../.ui/Icon';
import Preloader from '../../.ui/Preloader';
import getHashCode from '../../../lib/getHashCode';
import Button from '../../.ui/Button';

export interface DispatchedUserViewProps {
  fetchUserEvents: typeof actions.eventActions.fetchUserEventListAsync.request;
  createEvent: typeof actions.eventActions.createEventAsync.request;
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
  fetchTagList: typeof actions.eventActions.fetchTagListAsync.request;
}
export interface StoredUserViewProps extends EventBaseState { }
export type InjectedUserViewProps = DispatchedUserViewProps
& StoredUserViewProps
& { }

export class EventView extends Component<InjectedUserViewProps, {}> {
  componentDidMount() {
    const { fetchUserEvents, fetchTagList } = this.props;
    fetchUserEvents({ page: 1, onPage: 20 })
    fetchTagList({ })
  }

  componentDidUpdate() {
    // const { data } = this.props;
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
        <ScrolledContent orientation="horizontal" buttonSize="l">
          <Group>
            <Button
              className={`${base}__add`}
              level="office-secondary"
              angular
              size="xl"
              stretched="y"
              onClick={() => createEvent(Event.new())}
              before={<Icon noStroke svg={Ico} size={30} />}
            />
            <Preloader {...{ isLoading }} />
            <SimpleBlockList
              items={list}
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
        <ScrolledContent className={`${base}__list`}>
          <Group orientation="vertical">
            <MinifiedBlockList
              items={list}
              itemRenderer={item => (
                <MinifiedBlock
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
