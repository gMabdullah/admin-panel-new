import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface InventoryTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Inventory: InventoryTypeObj = {
  id: "inventory",
  title: "Inventory",
  type: "item",
  url: "/inventory/stock",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Inventory;
