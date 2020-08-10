import className from "classnames";
import React, { useContext } from "react";

import { MenuContext } from "../../../../core/contexts/MenuContext";

import "./HamburgerButton.scss";

export const HamburgerButton = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);

  return (
    <button
      className={className("HamburgerButton", {
        "HamburgerButton--active": menuOpen,
      })}
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="HamburgerButton__bar HamburgerButton__bar--top" />
      <span className="HamburgerButton__bar HamburgerButton__bar--middle" />
      <span className="HamburgerButton__bar HamburgerButton__bar--bottom" />
    </button>
  );
};
