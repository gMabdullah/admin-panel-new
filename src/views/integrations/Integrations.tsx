import TabsComponent from "ui-component/Tabs";

const Integrations = () => {
  const tabData = {
    labels: ["Payments", "Firebase"],
    to: ["/integration/payments", "/integration/firebase"],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Integrations;
