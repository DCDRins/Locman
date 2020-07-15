import React from 'react'
import Ground from '../../.ui/Ground'
import ClosestEvent from '../../ClosestEvent'
import UIPage from '../../.ui/UIPage'
import StockContentViewer from '../../StockContentViewer'
import Section from '../../.ui/Section'
import ScrolledContent from '../../.ui/ScrolledContent'
import Event from '../../.ui/Event'
import { StockEventListBaseState } from '../../../reducers/event-reducer'
import * as actions from '../../../actions'
import cuid from 'cuid'
import { onPageItemsCount } from '../../../common/constants'

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
    fetchEventList({ page: 1, onPage: onPageItemsCount });
    // fetchFreshEventList({ page: 1, onPage: onPageItemsCount });
  }

  render() {
    const {
      eventList: {
        data,
        isLoading,
      },
      // freshList: {
      //   data: freshData,
      //   isLoading: isFreshLoading,
      // },
    } = this.props
    const { list: eventList } = { ...data };
    // const { list: freshList } = { ...freshData };
    return (
      <UIPage moveFirst>
        <Ground stretch>
          <ClosestEvent />
        </Ground>
        {/* <Section header="Новые мероприятия">
          <ScrolledContent orientation="horizontal" isContentLoading={isLoading}>
            {isFreshLoading
              ? [...Array(onPageItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
              : freshList && freshList.map(({ id, characterCode, image, name, description, location }) => <Event key={id} charCode={characterCode} {...{ name }} subtitle={location} {...{ description }} image={image && image.path} />)
            }
          </ScrolledContent>
        </Section> */}
        <Section header="Новые мероприятия">
          <ScrolledContent orientation="horizontal" isContentLoading={isLoading}>
            {isLoading
              ? [...Array(onPageItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
              : eventList && eventList.map(({ id, characterCode, image, name, description, location }) => <Event key={id} charCode={characterCode} {...{ name }} subtitle={location} {...{ description }} image={image && image.path} />)
            }
          </ScrolledContent>
        </Section>
        {/* <Section header="Предложенные мероприятия">
        <Section header="Участие в мероприятиях"> */}
        {/* <StockContentViewer /> */}
      </UIPage>
    )
  }
}
