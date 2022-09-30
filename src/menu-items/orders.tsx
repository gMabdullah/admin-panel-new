import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface OrdersSideBarMenu {
  id: string;
  title: string;
  type: string;
  icon: OverrideIcon;
  children: {
    id: string;
    title: string;
    type: string;
    url: string;
    breadcrumbs: boolean;
  }[];
}

const Orders: OrdersSideBarMenu = {
  id: "orders",
  title: "Orders",
  type: "collapse",
  icon: IconBrandProducthunt,
  children: [
    {
      id: "business-orders",
      title: "Orders",
      type: "item",
      url: "/orders",
      breadcrumbs: false,
    },
    {
      id: "cart-abandonment",
      title: "Cart Abandonment",
      type: "item",
      url: "/orders/cart-abandonment",
      breadcrumbs: false,
    },
  ],
};

export default Orders;
