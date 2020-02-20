import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import routes, { Route as CustomRouteType } from '../../common/routes';
import getHashCode from '../../lib/getHashCode';

export default class Root extends Component {
  render() {
    return (
      <Route render={({ location }) => ( 
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
          >
            <Switch location={location}>
              {Object.values(routes).map(({ page, absolutePath, param = '' }: CustomRouteType) => (
                <Route
                  key={getHashCode(absolutePath)}
                  exact={param.length === 0}
                  path={`${absolutePath}/${param}`}
                  component={page}
                />
              ))}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        )}
      />
    );
  }
}
