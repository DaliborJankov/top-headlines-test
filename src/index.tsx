import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import { store } from "./core";
import { LanguagesContextProvider } from "./core/contexts/LanguageContext";

import "./core/i18next";
import "./scss/_reset.scss";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LanguagesContextProvider>
        <App />
      </LanguagesContextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
