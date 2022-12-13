import TabsComponent from "uiComponent/Tabs";

const Inventory = () => {
  const tabData = {
    labels: ["Stock", "Purchases", "Purchase Order", "Setup"],
    to: [
      "/inventory/stock",
      "/inventory/purchases",
      "/inventory/purchaseOrders",
      "/inventory/setup",
    ],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Inventory;
