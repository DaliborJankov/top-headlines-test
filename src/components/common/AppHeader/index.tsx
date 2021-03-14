import React from "react";

import { MenuContextProvider } from "./context/MenuContext";
import { AppNavigation } from "./partials/AppNavigation";
import { HamburgerButton } from "./partials/HamburgerButton";
import { Languages } from "./partials/Languages";

import "./AppHeader.scss";

export const AppHeader = () => {
  return (
    <MenuContextProvider>
      <header className="AppHeader">
        <HamburgerButton />
        <AppNavigation />
        <Languages />
      </header>
    </MenuContextProvider>
  );
};
