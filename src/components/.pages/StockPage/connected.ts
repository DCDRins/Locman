import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import StockPage, { DispatchedEventPageProps, StoredEventPageProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredEventPageProps => ({
  eventList: event.stockList,
  // freshList: event.fresh,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedEventPageProps => bindActionCreators({
  fetchEventList: actions.eventActions.fetchStockEventListAsync.request,
  // fetchFreshEventList: actions.eventActions.fetchFreshEventList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockPage);

