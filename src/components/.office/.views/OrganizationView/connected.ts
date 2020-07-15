import Types from 'MyTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { OrganizationView, DispatchedOrganizationViewProps, StoredOrganizationViewProps } from './view';
import * as actions from '../../../../actions';

const mapStateToProps = ({ client, organization, catalog }: Types.RootState): StoredOrganizationViewProps => ({
  user: client.user,
  organization: organization.current,
  organizationFromAPI: organization.new,
  cities: catalog.cities,
  organizationTypes: catalog.organizationTypes,
  organizationCategories: catalog.organizationCategories,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedOrganizationViewProps => bindActionCreators({
  fetchOrganizationData: actions.organizationActions.fetchOrganizationData.request,
  fetchUserData: actions.clientActions.fetchUserData.request,
  fetchCitiesList: actions.catalogActions.fetchCitiesListAsync.request,
  fetchOrganizationTypes: actions.catalogActions.fetchOrganizationTypes.request,
  fetchOrganizationCategories: actions.catalogActions.fetchOrganizationCategories.request,
  editOrganizationData: actions.organizationActions.editOrganizationData.request,
  uploadOrganizationImage: actions.organizationActions.uploadOrganizationImage.request,
  fetchOrganizationByInn: actions.organizationActions.fetchOrganizationByInn.request,
  registerNewOrganization: actions.organizationActions.registerNewOrganization.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationView);

