import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface AccessManagementTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const AccessManagement: AccessManagementTypeObj = {
  id: "accessManagement",
  title: "AccessManagement",
  type: "item",
  url: "/accessManagement",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default AccessManagement;
