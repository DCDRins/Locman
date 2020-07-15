import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import AuthenticateView, { DispatchedAuthenticateViewProps, StoredAuthenticateViewProps } from './view';

const mapStateToProps = ({ client: { auth } }: Types.RootState): StoredAuthenticateViewProps => ({
  data: auth.data,
  isLoading: auth.isLoading,
  error: auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedAuthenticateViewProps => bindActionCreators({
  auth: actions.clientActions.authAsync.request,
  confirm: actions.clientActions.confirm.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticateView);
