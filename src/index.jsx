import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Root from './components/.root';
import configureStore, { history } from './store/.config';
import MasterProvider from './common/context';
import './assets/styles/.main.scss';

// import './utils/Extends';
// import './styles/main.scss';

const store = configureStore(history, undefined);

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MasterProvider>
          <Component />
        </MasterProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
}

render(Root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
