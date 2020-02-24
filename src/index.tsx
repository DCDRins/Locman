import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store'
import Root from './components/.root';
import history from './services/history-service'; // chenge this
import MasterProvider from './common/context';
import './assets/styles/.main.scss';
import { appRoutes } from './common/routes';

// import './utils/Extends';
// import './styles/main.scss';

const store = configureStore(history, undefined);

function render(component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MasterProvider>
          {component}
        </MasterProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

render(<Root routes={appRoutes} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
