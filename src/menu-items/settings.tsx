import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface SettingsTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Settings: SettingsTypeObj = {
  id: "settings",
  title: "Settings",
  type: "item",
  url: "/settings/business-info",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Settings;
