import React from "react";
import { Route, Switch } from "react-router-dom";

import { routes } from "../router";

const App = () => {
  return (
    <>
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
