import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RouterEditor, { DispatchedRouterEditorProps, StoredRouterEditorProps } from './view';

const mapStateToProps = ({ route }: Types.RootState): StoredRouterEditorProps => ({
  acceptedRouteList: route.acceptedRouteList,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>): DispatchedRouterEditorProps => bindActionCreators({
  openContext: actions.systemActions.openContext,
  closeContext: actions.systemActions.closeContext,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouterEditor);
