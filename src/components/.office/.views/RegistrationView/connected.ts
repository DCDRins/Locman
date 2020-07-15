import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import RegistrationView, { DispatchedRegistrationViewProps, StoredRegistrationViewProps } from './view';

const mapStateToProps = ({ catalog, system }: Types.RootState): StoredRegistrationViewProps => ({
  organizationList: catalog.acceptedOrganizations,
  error: system.loader.error,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedRegistrationViewProps => bindActionCreators({
  register: actions.clientActions.register.request,
  fetchAcceptedOrganizationList: actions.catalogActions.fetchAcceptedOrganizationList.request,
  fetchRestOrganizationList: actions.catalogActions.fetchRestOrganizationList.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationView);
