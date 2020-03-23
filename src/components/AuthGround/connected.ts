import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import AuthGround, { DispatchedAuthGroundProps, StoredAuthGroundProps } from './view';

const mapStateToProps = ({ client: { auth } }: Types.RootState): StoredAuthGroundProps => ({
  data: auth.data,
  isLoading: auth.isLoading,
  error: auth.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedAuthGroundProps => bindActionCreators({
  auth: actions.clientActions.authAsync.request,
}, dispatch);


export const ConnectedAuthGround = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthGround);
