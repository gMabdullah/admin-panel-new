import TabsComponent from "ui-component/Tabs";

const Performance = () => {
  const tabData = {
    labels: ["Custom Reports", "POS Reports", "Feedback"],
    to: [
      "/performance/custom-reports",
      "/performance/pos-report",
      "/performance/feedback",
    ],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Performance;
