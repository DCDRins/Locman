import React, { FunctionComponent, Component } from 'react';
import { Link } from 'react-router-dom';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import { appRoutes } from '../../common/dictionaries/routes';
import Side from '../.ui/Side';
import Div from '../.ui/Div';
import * as actions from '../../actions'
import { ClosestEventBaseState } from '../../reducers/event-reducer';

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
    return (
      <Section className={base}>
        <Group
          // justify="center"
          content="center"
          orientation="vertical"
          className={`${base}__content`}
        >
          {/* <Button stretched level="tag" angular>Эрмитаж</Button> */}
          <Div className={`${base}__title`}>
            <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/any`}>Советский модернизм в архитектуре</Link>
          </Div>
          <Div className={`${base}__date`}>27.10.2020</Div>
          <Div className={`${base}__address`}>
            <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/:id`}>
              Музей-панорама
            </Link>
            : Дворцовая пл., 2, Санкт-Петербург, 190000
          </Div>
          <Div className={`${base}__address`}>
            <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/:id`}>
              Маршрут
            </Link>
            : Первый маршрут
          </Div>
        </Group>
      </Section>
    )
  }
}
