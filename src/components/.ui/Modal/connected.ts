import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Modal, { DispatchedModalProps, StoredModalProps } from './view';

const mapStateToProps = ({ system: { context } }: Types.RootState): StoredModalProps => ({
  context,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedModalProps => bindActionCreators({
  openModal: actions.systemActions.openModal,
  closeModal: actions.systemActions.closeModal,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
