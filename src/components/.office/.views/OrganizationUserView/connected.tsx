import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import OrganizationUserView, { DispatchedOrganizationUserViewProps, StoredOrganizationUserViewProps } from './view';

const mapStateToProps = ({ organization }: Types.RootState): StoredOrganizationUserViewProps => ({
  userList: organization.organizationUserList,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedOrganizationUserViewProps => bindActionCreators({
  fetchOrganizationUserList: actions.organizationActions.fetchOrganizationUserList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationUserView);
