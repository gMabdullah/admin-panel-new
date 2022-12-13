import TabsComponent from "components/Tabs";

const Integrations = () => {
  const tabData = {
    labels: ["Payments", "Firebase"],
    to: ["/integration/payments", "/integration/firebase"],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Integrations;
