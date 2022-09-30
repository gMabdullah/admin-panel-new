import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface SettingsSideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Settings: SettingsSideBarMenu = {
  id: "settings",
  title: "Settings",
  type: "item",
  url: "/settings/business-info",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Settings;
