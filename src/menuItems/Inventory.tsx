import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface InventorySideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Inventory: InventorySideBarMenu = {
  id: "inventory",
  title: "Inventory",
  type: "item",
  url: "/inventory/stock",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Inventory;
