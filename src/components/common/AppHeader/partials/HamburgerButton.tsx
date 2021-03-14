import className from "classnames";
import React from "react";

import { useMenuContext } from "../context/MenuContext";

import "./HamburgerButton.scss";

export const HamburgerButton = () => {
  const { menuOpen, setMenuOpen } = useMenuContext();

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
