import TabsComponent from "uiComponent/Tabs";

const Redemptions = () => {
  const tabData = {
    labels: ["Coupon Redemptions", "Loyalty Redemptions"],
    to: [
      "/customer-loyalty/redemptions/coupon-redemption",
      "/customer-loyalty/redemptions/loyalty-redemption",
    ],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Redemptions;
