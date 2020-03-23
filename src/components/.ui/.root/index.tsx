import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Route as CustomRouteType, RouteDictionary } from '../../../common/dictionaries/routes';
import getHashCode from '../../../lib/getHashCode';
import isSatisfied from '../../../lib/isSatisfied';


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
              {Object.values(routes).map(({ component, absolutePath, param = '', exact, credentials }: CustomRouteType) => (
                isSatisfied(credentials) && (
                  <Route
                    key={getHashCode(absolutePath)}
                    path={`${absolutePath}/${param}`}
                    component={component}
                    {...{ exact }}
                  />
                )
              ))}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}
