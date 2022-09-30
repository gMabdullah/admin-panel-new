import dashboard from "./dashboard";
import orders from "./orders";
import performance from "./performance";
import products from "./products";
import customerLoyalty from "./customerLoyalty";
import inventory from "./inventory";
import accessManagement from "./accessManagement";
import integrations from "./integrations";
import settings from "./settings";
import { NavItemType } from "types";

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [
    dashboard,
    orders,
    performance,
    products,
    customerLoyalty,
    inventory,
    accessManagement,
    integrations,
    settings,
  ],
};

export default menuItems;
