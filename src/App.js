import React, { Fragment, Suspense, lazy } from "react";
import { ThemeProvider } from "@mui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import NotificationBar from "./shared/components/NotificationBar";
import { Provider } from "react-redux";
import { store, persistedStore } from "./shared/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Main from "./logged_in/components/Main";

function App() {
  // const user = useSelector((state) => state.auth.email);
  // const token = useSelector((state) => state.auth.token);
  // const userRoles = useSelector((state) => state.auth.roles);
  // const roles = ["user", "tour"];
  // let permited =
  //   userRoles.filter((r) => roles.includes(r)).length > 0 ? true : false;
  // checkPermission(user, token, roles).then((res) => (permited = res.permited));

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <NotificationBar />
            <Pace color={theme.palette.primary.dark} />
            <Suspense fallback={<Fragment />}>
              <Routes>
                <Route>
                  <Main />
                </Route>
                {/* <Route>
                  <LoggedOutComponent />
                </Route> */}
              </Routes>
            </Suspense>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
