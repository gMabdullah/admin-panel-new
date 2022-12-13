import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface CustomerLoyaltySideBarMenu {
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

const CustomerLoyalty: CustomerLoyaltySideBarMenu = {
  id: "customerLoyalty",
  title: "CustomerLoyalty",
  type: "collapse",
  icon: IconBrandProducthunt,
  children: [
    {
      id: "redemptions",
      title: "Redemptions",
      type: "item",
      url: "/customer-loyalty/redemptions/coupon-redemption",
      breadcrumbs: false,
    },
    {
      id: "campaigns",
      title: "Campaigns",
      type: "item",
      url: "/customer-loyalty/campaigns",
      breadcrumbs: false,
    },
  ],
};

export default CustomerLoyalty;
