import React from 'react'
import Ground from '../../.ui/Ground'
import ClosestEvent from '../../ClosestEvent'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import ScrolledContent from '../../.ui/ScrolledContent'
import Event from '../../.ui/Event'
import { StockEventListBaseState } from '../../../reducers/event-reducer'
import * as actions from '../../../actions'
import cuid from 'cuid'
import { ReactComponent as PatternIcon } from '../../../assets/icons/patterns/pattern.svg'
import { previewItemsCount } from '../../../common/constants'
import Icon from '../../.ui/Icon'
import isSatisfied from '../../../lib/isSatisfied'
import roles from '../../../common/dictionaries/roles'

export interface DispatchedEventPageProps {
  fetchEventList: typeof actions.eventActions.fetchStockEventListAsync.request;
  // fetchFreshEventList: typeof actions.eventActions.fetchFreshEventList.request;
}
export interface StoredEventPageProps {
  eventList: StockEventListBaseState;
  // freshList: FreshEventBaseState;
}
export interface InjectedEventPageProps extends DispatchedEventPageProps, StoredEventPageProps { }

export default class StockPage extends React.Component<InjectedEventPageProps, {}> {
  componentDidMount() {
    const {
      eventList,
      // freshList,
      fetchEventList,
      // fetchFreshEventList,
    } = this.props;
    // const { currentPage: eventPage } = { ...eventList.data }
    // const { currentPage: freshPage } = { ...freshList.data }
    // const e_page = eventPage ? eventPage + 1 : 1;
    // const f_page = freshPage ? freshPage + 1 : 1;
    fetchEventList({ page: 1, onPage: previewItemsCount });
    // fetchFreshEventList({ page: 1, onPage: previewItemsCount });
  }

  render() {
    const {
      eventList: {
        data,
        isLoading,
      },
    } = this.props
    const { list: eventList } = { ...data };
    return (
      <UIPage>
        <ClosestEvent />
        <Section
          header="Новые мероприятия"
          pattern={<Icon svg={PatternIcon} size={200} noStroke />}
          type="accent"
        >
          <ScrolledContent orientation="horizontal" isContentLoading={isLoading}>
            {isLoading
              ? [...Array(previewItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
              : eventList && eventList.map(({ id, characterCode, image, name, description, location }) => <Event key={id} charCode={characterCode} {...{ name }} subtitle={location} {...{ description }} image={image && image.path} />)
            }
          </ScrolledContent>
        </Section>
      </UIPage>
    )
  }
}
