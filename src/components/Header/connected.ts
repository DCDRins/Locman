import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Header, { DispatchedHeaderProps, StoredHeaderProps } from './view';

const mapStateToProps = ({ client }: Types.RootState): StoredHeaderProps => ({
  user: client.user,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedHeaderProps => bindActionCreators({
  fetchUserData: actions.clientActions.fetchUserData.request,
  logout: actions.clientActions.logout,
  openContext: actions.systemActions.openContext,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

