import Types from 'MyTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RequestView, DispatchedRequestViewProps, StoredRequestViewProps } from './view';
import * as actions from '../../../../actions';

const mapStateToProps = ({ client, catalog }: Types.RootState): StoredRequestViewProps => ({
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedRequestViewProps => bindActionCreators({
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestView);

