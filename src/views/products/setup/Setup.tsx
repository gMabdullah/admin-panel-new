import TabsComponent from "uiComponent/Tabs";

const Setup = () => {
  const tabData = {
    labels: ["Option Sets", "Attributes", "Tags", "Brands", "POS Modifiers"],
    to: [
      "/products/setup/option-sets",
      "/products/setup/attributes",
      "/products/setup/tags",
      "/products/setup/brands",
      "/products/setup/pos-modifiers",
    ],
  };

  return <TabsComponent tabData={tabData} />;
};

export default Setup;
