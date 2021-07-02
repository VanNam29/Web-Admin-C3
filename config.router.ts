import { ConfigRouter } from "./types/type";
import {
  faUser,
  faBriefcase,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

export const routers: ConfigRouter[] = [
  // {
  //     path: "/",
  //     name: "Home",
  //     icon: ""
  // },
  {
    path: "/customers",
    name: "Customers",
    icon: { faUser },
  },
  {
    path: "/projects",
    name: "Projects",
    icon: { faShoppingCart },
  },
  {
    path: "/categories",
    name: "Categories",
    icon: { faBriefcase },
  },
  // {
  //   path: "/departments",
  //   name: "Departments",
  //   icon: "",
  // },
];
