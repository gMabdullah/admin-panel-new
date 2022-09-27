import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface CustomerLoyaltyTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  icon: OverrideIcon;
  children: {
    id: string;
    title: React.ReactNode | string;
    type: string;
    url: string;
    breadcrumbs: boolean;
  }[];
}

const CustomerLoyalty: CustomerLoyaltyTypeObj = {
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
