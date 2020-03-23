import Types from 'MyTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PersonalView, DispatchedPersonalViewProps, StoredPersonalViewProps } from './view';
import * as actions from '../../../actions';

const mapStateToProps = ({ client }: Types.RootState): StoredPersonalViewProps => ({
  user: client.user.user,
  isUserLoading: client.user.isUserLoading,
  userError: client.user.userError,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedPersonalViewProps => bindActionCreators({
  fetchUserData: actions.clientActions.fetchUserData.request,
  editUserData: actions.clientActions.editUserData.request,
  uploadUserImage: actions.clientActions.uploadUserImage.request,
}, dispatch);


export const PersonalViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalView);

