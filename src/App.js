import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import PrivateRoute from './PrivateRoute'
import NotificationBar from './shared/components/NotificationBar'
import { SnackbarProvider } from 'notistack';

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <GlobalStyles />
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
      <NotificationBar />
    </BrowserRouter>
  );
}

export default App;
