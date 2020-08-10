import { CategoriesView } from "../components/views/CategoriesView";
import { CategorySingleView } from "../components/views/CategorySingleView";
import { HomeView } from "../components/views/HomeView";
import { NoView } from "../components/views/NoView";
import { SearchView } from "../components/views/SearchView";
import { SingleNewsView } from "../components/views/SingleNewsView";

export interface Routes {
  path: string;
  name: string;
  component: React.FC;
  meta?: Record<string, any>;
}

export const routes: Routes[] = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: "/categories",
    name: "CategoriesView",
    component: CategoriesView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: "/category/:category",
    name: "CategorySingleView",
    component: CategorySingleView,
  },
  {
    path: "/search",
    name: "SearchView",
    component: SearchView,
    meta: {
      mainMenu: true,
    },
  },
  {
    path: "/news/:index",
    name: "SingleNewsView",
    component: SingleNewsView,
  },
  {
    path: "/category/news/:index",
    name: "SingleNewsView",
    component: SingleNewsView,
  },
  {
    path: "**",
    name: "NoView",
    component: NoView,
  },
];
