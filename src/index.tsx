import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import { LanguagesContextProvider } from "./core/contexts/LanguageContext";

import "./core/i18next";
import "./scss/_reset.scss";

ReactDOM.render(
  <BrowserRouter>
    <LanguagesContextProvider>
      <App />
    </LanguagesContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
