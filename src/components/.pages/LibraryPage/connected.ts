import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import LibraryPage, { DispatchedLibraryPageProps, StoredLibraryPageProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredLibraryPageProps => ({
  eventList: event.stockList,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedLibraryPageProps => bindActionCreators({
  fetchEventList: actions.eventActions.fetchStockEventListAsync.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryPage);

