import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import MuseumPage, { DispatchedMuseumPageProps, StoredMuseumPageProps } from './view';

const mapStateToProps = ({ organization, catalog }: Types.RootState): StoredMuseumPageProps => ({
  organizationList: organization.list,
  catalog,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedMuseumPageProps => bindActionCreators({
  fetchOrganizationList: actions.organizationActions.fetchOrganizationList.request,
  fetchCitiesList: actions.catalogActions.fetchCitiesListAsync.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MuseumPage);

