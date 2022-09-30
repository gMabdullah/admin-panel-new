import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface PerformanceSideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Performance: PerformanceSideBarMenu = {
  id: "performance",
  title: "Performance",
  type: "item",
  url: "/performance/custom-reports",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Performance;
