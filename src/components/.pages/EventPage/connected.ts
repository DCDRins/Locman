import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import EventPage, { DispatchedEventPageProps, StoredEventPageProps } from './view';

const mapStateToProps = ({ event, catalog }: Types.RootState): StoredEventPageProps => ({
  events: event.stockList,
  catalog,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedEventPageProps => bindActionCreators({
  fetchEventList: actions.eventActions.fetchStockEventListAsync.request,
  fetchCitiesList: actions.catalogActions.fetchCitiesListAsync.request,
  fetchEventFormatList: actions.catalogActions.fetchEventFormatList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);

