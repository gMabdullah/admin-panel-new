import { IconDashboard } from "@tabler/icons";
import { OverrideIcon } from "types";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardSideBarMenu {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Dashboard: DashboardSideBarMenu = {
  id: "dashboard",
  title: "Dashboard",
  type: "item",
  url: "/dashboard/sales",
  icon: IconDashboard,
  breadcrumbs: false,
};

export default Dashboard;
