import { CategoriesView } from "../components/views/CategoriesView";
import { CategorySingleView } from "../components/views/CategorySingleView";
import { HomeView } from "../components/views/HomeView";
import { NoView } from "../components/views/NoView";
import { SearchView } from "../components/views/SearchView";
import { SingleNewsView } from "../components/views/SingleNewsView";

type Route = "home" | "categories" | "categorySingle" | "search" | "newsSingle" | "unknownPage";

export const routePaths: Record<Route, string> = {
  home: "/",
  categories: "/categories",
  categorySingle: "/category/:category",
  search: "/search",
  newsSingle: "/news/:index",
  unknownPage: "**",
};

export interface Routes {
  path: string;
  name: string;
  component: React.FC;
  meta?: Record<string, any>;
}

export const routes: Routes[] = [
  {
    path: routePaths.home,
    name: "HomeView",
    component: HomeView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: routePaths.categories,
    name: "CategoriesView",
    component: CategoriesView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: routePaths.categorySingle,
    name: "CategorySingleView",
    component: CategorySingleView,
  },
  {
    path: routePaths.search,
    name: "SearchView",
    component: SearchView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: routePaths.newsSingle,
    name: "SingleNewsView",
    component: SingleNewsView,
  },
  {
    path: "/category/news/:index",
    name: "SingleNewsView",
    component: SingleNewsView,
  },
  {
    path: routePaths.unknownPage,
    name: "NoView",
    component: NoView,
  },
];
