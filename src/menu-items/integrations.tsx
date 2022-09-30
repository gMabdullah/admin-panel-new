import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface IntegrationsSideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Integrations: IntegrationsSideBarMenu = {
  id: "integrations",
  title: "Integrations",
  type: "item",
  url: "/integration/payments",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Integrations;
