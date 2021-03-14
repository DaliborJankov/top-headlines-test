import React, { useMemo, useState } from "react";

import { createSafeContext } from "../../../../utils/helper";

interface MenuContext {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuContext = createSafeContext<MenuContext>();

export const useMenuContext = MenuContext.hook;

export const MenuContextProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const value = useMemo(
    () => ({
      menuOpen,
      setMenuOpen,
    }),
    [menuOpen]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
