import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SystemState, { DispatchedSystemStateProps, StoredSystemStateProps } from './view';

const mapStateToProps = ({ system }: Types.RootState): StoredSystemStateProps => ({
  isLoading: system.isLoading,
  message: system.message,
  error: system.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedSystemStateProps => bindActionCreators({
}, dispatch);


export const SystemStateConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemState);
