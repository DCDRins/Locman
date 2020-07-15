import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import MuseumPage, { DispatchedMuseumPageProps, StoredMuseumPageProps } from './view';

const mapStateToProps = ({ event }: Types.RootState): StoredMuseumPageProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedMuseumPageProps => bindActionCreators({
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuseumPage);

