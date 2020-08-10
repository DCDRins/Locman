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
import { previewItemsCount } from '../../../common/constants'
import { StockEventListBaseState } from '../../../reducers/event-reducer'
import { ReactComponent as PatternIcon } from '../../../assets/icons/patterns/pattern.svg'
import { ReactComponent as NewsIcon } from '../../../assets/icons/news.svg'
import terms from '../../../common/dictionaries/terms'
import EdunaveImage from '../../../assets/images/edunavi.jpg'
import Image from '../../.ui/Image'
import Footer from '../../Footer'
import cuid from 'cuid'
import Icon from '../../.ui/Icon'
import Button from '../../.ui/Button'
import Div from '../../.ui/Div'
import { appRoutes } from '../../../common/dictionaries/routes'

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
    fetchEventStockList({ page: currentEventPage || 1, onPage: previewItemsCount });
    fetchNewsList({ page: currentEventPage || 1, onPage: previewItemsCount });
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
    const base = "Main-Page";
    const { list: newsList } = { ...newsData };
    const { list: freshList } = { ...freshData };
    return (
      <UIPage className={base}>
        <Slider actualData={sliderNews} />
        <Section
          header="Новые мероприятия"
          type="accent"
          pattern={<Icon svg={PatternIcon} size={300} noStroke />}
        >
          <ScrolledContent orientation="horizontal" isContentLoading={isFreshLoading}>
            {isFreshLoading
              ? [...Array(previewItemsCount)].map(() => <Event key={cuid()} name="" subtitle="" image="loader" isLoading />)
              : freshList && freshList.map(({ id, characterCode, image, name, description, location, startDate }) => <Event key={id} charCode={characterCode} {...{ name }} date={startDate} subtitle={location} {...{ description }} image={image && image.path} />)
            }
          </ScrolledContent>
          <Group justify="center" content="center" stretched="x" className={`${base}__follow`}>
            <Button level="tertiary" angular route={appRoutes.EVENT_PAGE}>
              Все мероприятия
            </Button>
          </Group>
        </Section>
        {/* {isSatisfied([roles.PARTICIPANT, roles.PARENT, roles.TEACHER]) && <CurrentRoute />} */}
        {!isNewsLoading && newsList && (
          <Section
            header={terms.NEWS_VIEWER}
            pattern={<Icon svg={NewsIcon} size={200} noStroke />}
          >
            <ScrolledContent orientation="horizontal" isContentLoading={isNewsLoading}>
              {newsList.map(news => (
                <News key={news.characterCode} {...news} />
              ))}
            </ScrolledContent>
          </Section>
        )}
         <Section header={terms.PARTNERS} type="secondary" unfollow>
          <Group justify="center">
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
