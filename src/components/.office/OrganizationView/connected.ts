// import Types from 'MyTypes';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { OrganizationView, DispatchedOrganizationViewProps, StoredOrganizationViewProps } from './view';
import * as actions from '../../../actions';

// const mapStateToProps = ({  }: Types.RootState): StoredUserViewProps => ({
  
// });

// const mapDispatchToProps = (dispatch: Dispatch): DispatchedUserViewProps => bindActionCreators({
// }, dispatch);


export const PersonalViewConnected = connect(
  // mapStateToProps,
  // mapDispatchToProps
)(OrganizationView);

