import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Header, { DispatchedHeaderProps, StoredHeaderProps } from './view';

const mapStateToProps = ({ client }: Types.RootState): StoredHeaderProps => ({
  user: client.user.user,
  isUserLoading: client.user.isUserLoading,
  userError: client.user.userError,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedHeaderProps => bindActionCreators({
  fetchUserData: actions.clientActions.fetchUserData.request,
  logout: actions.clientActions.logout,
}, dispatch);

export const HeaderConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

