import classNames from "classnames";
import React, { useContext } from "react";
import { NavLink, matchPath, useHistory } from "react-router-dom";

import { MenuContext } from "../../../../core/contexts/MenuContext";
import { routes } from "../../../../router";
import { useDeepTranslation } from "../../../../utils/helper";

import "./AppNavigation.scss";

export const AppNavigation = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);
  const { t } = useDeepTranslation("AppNavigation");
  const navRoutes = routes.filter((route) => route.meta?.mainMenu);

  const history = useHistory();

  const isNavLinkActive = (routePath: string): boolean => {
    const matchedPath = matchPath(history.location.pathname, {
      path: routePath,
      exact: true,
    });

    return !!matchedPath;
  };

  return (
    <nav
      className={classNames("AppNavigation", menuOpen && "AppNavigation--open")}
    >
      <ul className="AppNavigation__list">
        {navRoutes.map((route, index) => {
          return (
            <li key={index} className="AppNavigation__item">
              <NavLink
                exact
                className={classNames(
                  "AppNavigation__link",
                  isNavLinkActive(route.path) && "AppNavigation__link--active"
                )}
                activeClassName="AppNavigation__link--active"
                onClick={() => setMenuOpen(!menuOpen)}
                to={route.path}
              >
                {t(route.name)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
