import Types from 'MyTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { PersonalView, DispatchedPersonalViewProps, StoredPersonalViewProps } from './view';
import * as actions from '../../../../actions';

const mapStateToProps = ({ client, catalog }: Types.RootState): StoredPersonalViewProps => ({
  user: client.user,
  acceptedOrganizations: catalog.acceptedOrganizations,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedPersonalViewProps => bindActionCreators({
  fetchUserData: actions.clientActions.fetchUserData.request,
  editUserData: actions.clientActions.editUserData.request,
  uploadUserImage: actions.clientActions.uploadUserImage.request,
  fetchAcceptedOrganizationList: actions.catalogActions.fetchAcceptedOrganizationList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalView);

