import Dashboard from "./views/dashboard/dashboard";
import Discover from "./views/discover/discover";
import Home from "./views/home/home";
import Login from "./views/login/LoginPage";

enum SOLUTIONS {
  KIBANA = "kibana",
  OBSERVABILITY = "observability",
  ENTERPRISE_SEARCH = "enterprise_search",
  SECURITY = "security",
}

export const orderedCategories = [
  {
    id: SOLUTIONS.KIBANA,
    icon: "logoKibana",
    label: "Analytics",
  },
  {
    id: SOLUTIONS.ENTERPRISE_SEARCH,
    icon: "logoEnterpriseSearch",
    label: "Enterprise Search",
  },
  {
    id: SOLUTIONS.OBSERVABILITY,
    icon: "logoObservability",
    label: "Observability",
  },
  {
    id: SOLUTIONS.SECURITY,
    icon: "logoSecurity",
    label: "Security",
  },
];

export const routes = [
  {
    category: SOLUTIONS.KIBANA,
    label: "Discover",
    path: "/discover",
    component: Discover,
  },
  {
    category: SOLUTIONS.KIBANA,
    label: "Dashboard",
    path: "/dashboard",
    component: Dashboard,
    routes: [
      {
        path: "/dashboard/:id",
        component: Dashboard,
      },
    ],
  },
  {
    label: "Login",
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Home,
  },
];
