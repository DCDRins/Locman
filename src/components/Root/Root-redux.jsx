import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import restore from '../../actions/global';
import { fetchUserProfile, fetchUserClassmatesShort, fetchUserClassmates } from '../../actions/Session';
import { fetchFilterList } from '../_pages/TeacherGameSettingsPage/QuestionsEditor/QuestionEditor-actions';
import Root from './Root-container';

const rootContainer = props => <Root {...props} />;

const mapDispatchToProps = dispatch => bindActionCreators({
  restore,
  fetchUserProfile,
  fetchUserClassmates,
  fetchUserClassmatesShort,
  fetchFilterList,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(rootContainer);
