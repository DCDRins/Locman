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
import { previewItemsCount } from '../../../common/constants'

export interface DispatchedLibraryPageProps {
  fetchEventList: typeof actions.eventActions.fetchStockEventListAsync.request;
}
export interface StoredLibraryPageProps {
  eventList: StockEventListBaseState;
}
export interface InjectedLibraryPageProps extends DispatchedLibraryPageProps, StoredLibraryPageProps { }

export default class LibraryPage extends React.Component<InjectedLibraryPageProps, {}> {
  componentDidMount() {
    const { fetchEventList, eventList: { data } } = this.props;
    // const { currentPage } = { ...data }
    // const page = currentPage ? currentPage + 1 : 1;
    fetchEventList({ page: 1, onPage: previewItemsCount });
  }

  render() {
    const {
      eventList: {
        data,
        isLoading,
      }
    } = this.props
    const { list: eventList } = { ...data };
    return (
      <UIPage moveFirst>
        <Ground stretch>
          <ClosestEvent />
        </Ground>
        {eventList && (
          <Section header="Новые мероприятия">
            <ScrolledContent orientation="horizontal" isContentLoading={isLoading}>
              {isLoading
                ? [...Array(previewItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
                : eventList.map(({ id, image, name, description, location }) => <Event key={id} {...{ name }} subtitle={location} {...{ description }} image={image && image.path} />)
              }
            </ScrolledContent>
          </Section>
        )}
        <StockContentViewer />
      </UIPage>
    )
  }
}
