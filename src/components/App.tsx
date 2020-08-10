import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { LanguagesContext } from "../core/contexts/LanguageContext";
import { getTopHeadlines } from "../core/top-headlines";
import { routes } from "../router";
import { AppHeader } from "./common/AppHeader";

const App = () => {
  const dispatch = useDispatch();
  const { currentLanguage } = useContext(LanguagesContext);

  useEffect(() => {
    dispatch(getTopHeadlines({ language: currentLanguage }));
  }, [currentLanguage, dispatch]);

  return (
    <>
      <AppHeader />
      <main className="AppMain">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact />
          ))}
        </Switch>
      </main>
    </>
  );
};

export default App;
