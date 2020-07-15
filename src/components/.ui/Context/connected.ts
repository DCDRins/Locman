import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Context, { DispatchedContextProps, StoredContextProps } from './view';

const mapStateToProps = ({ system: { context } }: Types.RootState): StoredContextProps => ({
  context,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedContextProps => bindActionCreators({
  openContext: actions.systemActions.openContext,
  closeContext: actions.systemActions.closeContext,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Context);
