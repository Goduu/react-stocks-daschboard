import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import '../node_modules/react-resizable/css/styles.css'
import '../node_modules/react-grid-layout/css/styles.css'
import { Provider } from 'react-redux'
import {store} from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
