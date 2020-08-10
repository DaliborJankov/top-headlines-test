import React from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "../router";
import { AppHeader } from "./common/AppHeader";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className="AppMain">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} exact path={route.path} component={route.component} />
          ))}
        </Switch>
      </main>
    </>
  );
};

export default App;
