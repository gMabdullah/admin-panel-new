import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface IntegrationsTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Integrations: IntegrationsTypeObj = {
  id: "integrations",
  title: "Integrations",
  type: "item",
  url: "/integration/payments",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Integrations;
