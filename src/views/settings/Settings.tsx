import TabsComponent from "components/Tabs";

const Settings = () => {
  const tabData = {
    labels: [
      "Business Info",
      "Orders",
      "Business Hours",
      "Reservations",
      "Email",
      "SMS",
      "POS Settings",
    ],
    to: [
      "/settings/business-info",
      "/settings/orders",
      "/settings/business-hours",
      "/settings/reservation",
      "/settings/email",
      "/settings/sms",
      "/settings/pos",
    ],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Settings;
