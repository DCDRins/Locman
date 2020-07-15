import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Route as CustomRouteType, RouteDictionary, officeAppRoutes, appRoutes } from '../../../common/dictionaries/routes';
import isSatisfied from '../../../lib/isSatisfied';
import roles from '../../../common/dictionaries/roles';

const Root = ({ routes }: { routes: RouteDictionary }) => {
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
                  key={absolutePath}
                  path={`${absolutePath}/${param}`}
                  {...{ exact }}
                  component={component}
                />
              )
            ))}
            <Route render={() => <Redirect to={{ pathname: "/" }} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}
    />
  );
}

export default Root;
