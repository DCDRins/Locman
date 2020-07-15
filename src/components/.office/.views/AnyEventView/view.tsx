
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Section from '../../../.ui/Section';
import EventTileFullscreen, { StoredEventTileFullscreenProps, DispatchedEventTileFullscreenProps } from '../../EventTile/Fullscreen';
import * as actions from '../../../../actions';
import { CurrentEventBaseState } from '../../../../reducers/event-reducer';
import { Event } from '../../../../models/event';
import Preloader from '../../../.ui/Preloader';
import { TagsBaseState, EventCatalogBaseState } from '../../../../reducers/catalog-reducer';
import { HasRouterProps } from '../../../../.types/props';

export interface DispatchedAnyEventViewProps extends DispatchedEventTileFullscreenProps {
  fetchEvent: typeof actions.eventActions.fetchEventAsync.request;
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
  fetchTagList: typeof actions.catalogActions.fetchTagListAsync.request;
  fetchEventFormatList: typeof actions.catalogActions.fetchEventFormatList.request;
  fetchEventLevelList: typeof actions.catalogActions.fetchEventLevelList.request;
}
export interface StoredAnyEventViewProps extends StoredEventTileFullscreenProps {
  catalog: {
    event: EventCatalogBaseState;
    tags: TagsBaseState;
  };
  event: CurrentEventBaseState;
}
export type InjectedAnyEventViewProps = DispatchedAnyEventViewProps
& StoredAnyEventViewProps
& HasRouterProps
& { }

class _AnyEventView extends Component<InjectedAnyEventViewProps, {}> {
  componentDidMount() {
    const {
      fetchEvent,
      fetchTagList,
      fetchEventFormatList,
      fetchEventLevelList,
      match: {
        params: {
          charCode,
        },
      }
    } = this.props;
    fetchEvent(charCode)
    fetchTagList({ })
    fetchEventFormatList({ })
    fetchEventLevelList({ })
  }

  componentDidUpdate() {
    // const { event } = this.props;
  }

  render() {
    const base = 'Event-View'
    const {
      event: {
        data,
        isLoading,
      },
      catalog,
      deleteEvent,
      editEvent,
      fetchTagList,
      uploadImage,
      uploadImageRange,
      deleteImageFromRange,
    } = this.props;
    return (
      <Section className={base}>
        {!isLoading && data && (
          <EventTileFullscreen
            data={Event.deserialize(data)}
            {...{ deleteEvent }}
            {...{ editEvent }}
            {...{ fetchTagList }}
            {...{ uploadImage }}
            {...{ uploadImageRange }}
            {...{ deleteImageFromRange }}
            {...{ catalog }}
          />
        )}
        <Preloader {...{ isLoading }} size={50} />
      </Section>
    )
  }
}

export const AnyEventView = withRouter(_AnyEventView)