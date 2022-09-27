import { IconDashboard } from "@tabler/icons";
import { OverrideIcon } from "types";

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

interface DashboardMenuProps {
  id: string;
  title: React.ReactNode | string;
  type: string;
  url: string;
  icon: OverrideIcon;
  breadcrumbs: boolean;
}

const Dashboard: DashboardMenuProps = {
  id: "dashboard",
  title: "Dashboard",
  type: "item",
  url: "/dashboard/sales",
  icon: IconDashboard,
  breadcrumbs: false,
};

export default Dashboard;
