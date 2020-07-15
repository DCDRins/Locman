import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import EduProgramView, { DispatchedEduProgramViewProps, StoredEduProgramViewProps } from './view';

const mapStateToProps = ({ catalog }: Types.RootState): StoredEduProgramViewProps => ({
  userEduProgramList: catalog.userEduProgramList,
  subjectList: catalog.subjectList,
  tagList: catalog.tags,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedEduProgramViewProps => bindActionCreators({
  fetchUserEduProgramList: actions.catalogActions.fetchUserEduProgramList.request,
  fetchSubjectList: actions.catalogActions.fetchSubjectList.request,
  fetchTagList: actions.catalogActions.fetchTagListAsync.request,
  createProgram: actions.catalogActions.createEduProgram.request,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EduProgramView);
