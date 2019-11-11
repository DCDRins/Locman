import React, { FunctionComponent } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import ThemeContext from '../../common/context/theme/theme.context'
import routes, { Route as CustomRouteType } from '../../common/routes';
import getHashCode from '../../lib/getHashCode';

const Root: FunctionComponent = () => {
  return (
    <Route render={({ location }) => (
      <ThemeContext.Consumer>
        {({ darkMode }) => (
          <TransitionGroup className={darkMode ? 'theme-dark' : 'theme-light'}>
            <CSSTransition
              key={location.key}
              timeout={0}
              // timeout={450}
              classNames="css-transition"
            >
              <Switch location={location}>
                {Object.values(routes).map(({ page, absolutePath }: CustomRouteType) => (
                  <Route key={getHashCode(absolutePath)} exact path={absolutePath} component={page} />
                ))}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      </ThemeContext.Consumer>
      )}
    />
  );
}

export default Root
