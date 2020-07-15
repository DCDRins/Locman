import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SystemState, { DispatchedSystemStateProps, StoredSystemStateProps } from './view';

const mapStateToProps = ({ system }: Types.RootState): StoredSystemStateProps => ({
  isLoading: system.loader.isLoading,
  message: system.loader.message,
  error: system.loader.error,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchedSystemStateProps => bindActionCreators({
}, dispatch);


export const SystemStateConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemState);
