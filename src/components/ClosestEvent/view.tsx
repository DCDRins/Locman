import React, { FunctionComponent, Component } from 'react';
import { Link } from 'react-router-dom';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import { appRoutes } from '../../common/dictionaries/routes';
import Side from '../.ui/Side';
import Div from '../.ui/Div';
import * as actions from '../../actions'
import { ClosestEventBaseState } from '../../reducers/event-reducer';
import Ground from '../.ui/Ground';

export interface StoredClosestEventProps {
  event: ClosestEventBaseState;
}
export interface DispatchedClosestEventProps {
  fetchClosestEvent: typeof actions.eventActions.fetchClosestEvent.request;
}
interface InjectedProps extends StoredClosestEventProps, DispatchedClosestEventProps { }

export default class ClosestEvent extends Component<InjectedProps, {}> {
  componentDidMount() {
    const { fetchClosestEvent } = this.props
    fetchClosestEvent({ });
  }
  render() {
    const base = 'Current-Event';
    const { event: {
      data,
      isLoading,
    } } = this.props;
    const { event, route } = { ...data }
    
    return (
      <Ground
        stretch
        solid
        src={event && event.image && event.image.path}
        mask="dark-left"
        limit
        className={base}
      >
        {event ? (
          <Section>
            <Group
              content="center"
              orientation="vertical"
              className={`${base}__content`}
            >
              <Div className={`${base}__title`}>
                <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/any`}>{event.name}</Link>
              </Div>
              <Div className={`${base}__date`}>{event.startDate}</Div>
              <Div className={`${base}__address`}>
                <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/:id`}>
                  <Div both>
                    Музей-панорама
                  </Div>
                </Link>
                {event.location}
              </Div>
              {route && (
                <Div className={`${base}__address`}>
                  <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/:id`}>
                    {route.name}
                  </Link>
                </Div>
              )}
            </Group>
          </Section>
        ) : null}
      </Ground>
    )
  }
}
