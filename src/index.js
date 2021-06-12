import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import '../node_modules/react-resizable/css/styles.css'
import '../node_modules/react-grid-layout/css/styles.css'
import { Provider } from 'react-redux'
import { store, persistedStore } from './shared/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import './shared/i18n/i18n';

// const preloadedState = window.__PRELOADED_STATE__
// const store = configureStore(preloadedState)


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
        <App />,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
