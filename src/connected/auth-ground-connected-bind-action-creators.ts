import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { authAsync } from '../actions/client-actions';
import { DispatchedAuthProps, StoredAuthProps } from '../components/AuthGround';
import AuthGround from '../components/AuthGround';

export const mapStateToProps = ({ client }: Types.RootState): StoredAuthProps => ({
  authData: client.auth.data,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedAuthProps => bindActionCreators({ // <-- Dispatch<Types.RootAction> here, but it's not working
  auth: authAsync.request,
}, dispatch); // <- dispatch here is nottypesafe 


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthGround);
