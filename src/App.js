import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import PrivateRoute from './PrivateRoute'
import NotificationBar from './shared/components/NotificationBar'
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux'
import { store, persistedStore } from './shared/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'
const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <GlobalStyles />
              <NotificationBar />
              <Pace color={theme.palette.primary.dark} />
              <Suspense fallback={<Fragment />}>
                <Switch>
                  <PrivateRoute path="/c" roles={['user', 'tour']} component={LoggedInComponent} />
                  {/* <Route path="/c">
              <LoggedInComponent />
            </Route> */}
                  <Route>
                    <LoggedOutComponent />
                  </Route>
                </Switch>
              </Suspense>
            </SnackbarProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
