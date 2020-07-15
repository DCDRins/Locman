import React, { Component } from 'react'
import Slider from '../../Slider'
import CurrentRoute from '../../CurrentRoute'
import News from '../../News'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import ScrolledContent from '../../.ui/ScrolledContent'
import Group from '../../.ui/Group'
import Event from '../../.ui/Event'
import isSatisfied from '../../../lib/isSatisfied'
import roles, { insteadOf } from '../../../common/dictionaries/roles'
import * as actions from '../../../actions'
import { SliderBaseState, NewsListBaseState } from '../../../reducers/news-reducer'
import { onPageItemsCount } from '../../../common/constants'
import { StockEventListBaseState } from '../../../reducers/event-reducer'
import terms from '../../../common/dictionaries/terms'
import OmegaImage from '../../../assets/images/omega-group.png'
import EdunaveImage from '../../../assets/images/edunavi.jpg'
import Image from '../../.ui/Image'
import Footer from '../../Footer'
import cuid from 'cuid'

export interface DispatchedMainPageProps {
  fetchSliderNews: typeof actions.newsActions.fetchSliderNews.request;
  fetchEventStockList: typeof actions.eventActions.fetchStockEventListAsync.request;
  fetchNewsList: typeof actions.newsActions.fetchNewsList.request;
}
export interface StoredMainPageProps {
  sliderNews: SliderBaseState;
  stockEventList: StockEventListBaseState;
  newsList: NewsListBaseState;
}
interface InjectedProps extends DispatchedMainPageProps, StoredMainPageProps { }

export default class MainPage extends Component<InjectedProps> {
  componentDidMount() {
    const {
      stockEventList: {
        data: eventData,
      },
      fetchSliderNews,
      fetchEventStockList,
      fetchNewsList,
    } = this.props
    const { currentPage: currentEventPage } = { ...eventData }

    fetchSliderNews({ });
    fetchEventStockList({ page: currentEventPage || 1, onPage: onPageItemsCount });
    fetchNewsList({ page: currentEventPage || 1, onPage: onPageItemsCount });
  }

  render() {
    const {
      sliderNews,
      stockEventList: {
        data: freshData,
        isLoading: isFreshLoading,
      },
      newsList: {
        data: newsData,
        isLoading: isNewsLoading,
      },
    } = this.props;
    const { list: newsList } = { ...newsData };
    const { list: freshList } = { ...freshData };
    return (
      <UIPage>
        <Slider actualData={sliderNews} />
        <Section header="Новые мероприятия">
          <ScrolledContent orientation="horizontal" isContentLoading={isFreshLoading}>
            {isFreshLoading
              ? [...Array(onPageItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
              : freshList && freshList.map(({ id, characterCode, image, name, description, location }) => <Event key={id} charCode={characterCode} {...{ name }} subtitle={location} {...{ description }} image={image && image.path} />)
            }
          </ScrolledContent>
        </Section>
        {isSatisfied([roles.PARTICIPANT, roles.PARENT, roles.TEACHER]) && <CurrentRoute />}
        {!isNewsLoading && newsList && (
          <Section header={terms.NEWS_VIEWER}>
            <ScrolledContent orientation="horizontal" isContentLoading={isNewsLoading}>
              {newsList.map(news => (
                <News key={news.characterCode} {...news} />
              ))}
            </ScrolledContent>
          </Section>
        )}
        <Section header={terms.PARTNERS}>
          <Group justify="start">
            {/* <a href="https://gkomega.ru/" target="blank">
              <Image src={OmegaImage} height={100} keepAspectRatio style={{ marginRight: 20 }} />
            </a> */}
            <a href="https://edunavi.online/" target="blank">
              <Image src={EdunaveImage} height={100} keepAspectRatio />
            </a>
          </Group>
        </Section>
        <Footer />
      </UIPage>
    )
  }
}
