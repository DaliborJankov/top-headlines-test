import React, { createContext, useState } from "react";

interface MenuInitalContext {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const languagesInitialContext: MenuInitalContext = {
  menuOpen: false,
  setMenuOpen: (): void => {},
};

export const MenuContext = createContext<MenuInitalContext>(
  languagesInitialContext
);

export const MenuContextProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
