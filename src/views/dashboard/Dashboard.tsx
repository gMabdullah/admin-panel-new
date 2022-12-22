import TabsComponent from "components/Tabs";

const Dashboard = () => {
  const tabData = {
    labels: ["Sales", "Orders", "Customers"],
    to: ["/dashboard/sales", "/dashboard/orders", "/dashboard/customers"],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Dashboard;
