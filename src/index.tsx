import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store'
import Root from './components/.ui/.root';
import history from './services/history-service'; // chenge this
import MasterProvider from './common/context';
import './assets/styles/.main.scss';
import { appRoutes } from './common/dictionaries/routes';
import SystemState from './components/SystemState';

// import './utils/Extends';
// import './styles/main.scss';

const store = configureStore(history, undefined);
const root = document.getElementById('root');
const modal = document.getElementById('modal');

function render(component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MasterProvider>
          {component}
          {modal && ReactDOM.createPortal((
            <SystemState />
          ), modal)}
        </MasterProvider>
      </ConnectedRouter>
    </Provider>,
    root,
    );
    return 
  }

render(<Root routes={appRoutes} />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
