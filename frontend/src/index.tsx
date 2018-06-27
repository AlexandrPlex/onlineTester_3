import * as React from 'react';
import * as ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { createBrowserHistory } from 'history';

import { App } from 'App';
import { configureStore } from 'store';
import { isProduction } from 'utils';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

// Webpack offline plugin
if (isProduction) {
  OfflinePluginRuntime.install();
}

const initialState = {};

// Create browser history
const history = createBrowserHistory();

// Configure store
const store = configureStore(initialState, history);

// Create render function
const render = (Component: any) => {
  ReactDom.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// First time render
render(App);

// Hot Reload Module API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('App').App;
    render(NextApp);
  });
}
