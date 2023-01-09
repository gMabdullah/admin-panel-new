import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Performance from "./Performance";
import Products from "./Products";
import CustomerLoyalty from "./CustomerLoyalty";
import Inventory from "./Inventory";
import AccessManagement from "./AccessManagement";
import Integrations from "./Integrations";
import Settings from "./Settings";
import { NavItemType } from "types";

import useAxios from "axios-hooks";

// ==============================|| MENU ITEMS ||============================== //

const menuItems = () => {};

const MenuItems: { items: NavItemType[] } = {
  items: [
    Dashboard,
    Orders,
    Performance,
    Products,
    CustomerLoyalty,
    Inventory,
    AccessManagement,
    Integrations,
    Settings,
  ],
};

export default MenuItems;
