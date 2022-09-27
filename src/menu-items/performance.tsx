import { IconBrandProducthunt } from "@tabler/icons";
import { OverrideIcon } from "types";

interface PerformanceTypeObj {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Performance: PerformanceTypeObj = {
  id: "performance",
  title: "Performance",
  type: "item",
  url: "/performance/custom-reports",
  icon: IconBrandProducthunt,
  breadcrumbs: false,
};

export default Performance;
