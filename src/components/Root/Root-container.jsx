import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
// import UserPage from '../_pages/UserPage';
// import * as routes from '../../constants/Routes';

const propTypes = {
  restore: PropTypes.func.isRequired,
};

class Root extends React.Component {
  componentDidMount = () => {}

  render() {
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={450}
            classNames="css-transition"
          >
            <Switch location={location}>
              {/* <Route exact path={routes.ROOT} component={TeacherPage} /> */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}

Root.propTypes = propTypes;

export default Root;
