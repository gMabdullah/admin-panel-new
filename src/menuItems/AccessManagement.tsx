import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface AccessManagementSideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const AccessManagement: AccessManagementSideBarMenu = {
  id: "accessManagement",
  title: "AccessManagement",
  type: "item",
  url: "/accessManagement",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default AccessManagement;
