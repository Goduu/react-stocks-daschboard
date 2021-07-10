import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import './shared/i18n/i18n';

// const preloadedState = window.__PRELOADED_STATE__
// const store = configureStore(preloadedState)


ReactDOM.render(
        <App />,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
