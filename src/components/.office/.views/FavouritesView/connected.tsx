import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
import FavouritesView, {  } from './view';

// const mapStateToProps = ({  }: Types.RootState): StoredEventViewProps => ({ });

// const mapDispatchToProps = (dispatch: Dispatch): DispatchedEventViewProps => bindActionCreators({ }, dispatch);


export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(FavouritesView);
