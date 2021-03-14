import React from "react";
import { Route, Switch } from "react-router-dom";

import { SingleNewsContextProvider } from "../core/contexts/SingleNewsContext";
import { routes } from "../router";
import { AppHeader } from "./common/AppHeader";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className="AppMain">
        <SingleNewsContextProvider>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} component={route.component} exact />
            ))}
          </Switch>
        </SingleNewsContextProvider>
      </main>
    </>
  );
};

export default App;
