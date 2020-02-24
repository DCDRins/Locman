import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Route as CustomRouteType, RouteDictionary } from '../../common/routes';
import getHashCode from '../../lib/getHashCode';


export default class Root extends Component<{ routes: RouteDictionary }, {}> {
  render() {
    const { routes } = this.props;
    return (
      <Route render={({ location }) => ( 
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
          >
            <Switch location={location}>
              {Object.values(routes).map(({ page, absolutePath, param = '', exact }: CustomRouteType) => (
                <Route
                  key={getHashCode(absolutePath)}
                  path={`${absolutePath}/${param}`}
                  component={page}
                  {...{ exact }}
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
