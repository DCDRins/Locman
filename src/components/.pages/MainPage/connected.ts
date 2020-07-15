import Types from 'MyTypes';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import MainPage, { DispatchedMainPageProps, StoredMainPageProps } from './view';

const mapStateToProps = ({ news, event }: Types.RootState): StoredMainPageProps => ({
  sliderNews: news.slider,
  stockEventList: event.stockList,
  newsList: news.newsList,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedMainPageProps => bindActionCreators({
  fetchSliderNews: actions.newsActions.fetchSliderNews.request,
  fetchEventStockList: actions.eventActions.fetchStockEventListAsync.request,
  fetchNewsList: actions.newsActions.fetchNewsList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

