import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import ListData from "layouts/listdata";
import DetailPage from "layouts/detail";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "List data",
    key: "list-data",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/list",
    component: <ListData />,
  },
  {
    type: "collapse",
    name: "Detail Page",
    key: "detail-page",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/detail/:id",
    component: <DetailPage />,
  },
];

export default routes;
